"use client"

import {useState, useEffect, useCallback, useRef} from "react"
import {Button} from "@/components/ui/button"

type Position = { x: number; y: number }
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

const GRID_SIZE = 20
const INITIAL_SNAKE = [{x: 10, y: 10}]
const INITIAL_FOOD = {x: 15, y: 15}

export function Hero() {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
    const [food, setFood] = useState<Position>(INITIAL_FOOD)
    const [direction, setDirection] = useState<Direction>("RIGHT")
    const [gameRunning, setGameRunning] = useState(false)
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [displayedText, setDisplayedText] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [gameSpeed, setGameSpeed] = useState(150) // Speed in ms (lower = faster)
    const [difficultyLevel, setDifficultyLevel] = useState(1) // 1-5 difficulty levels
    const [highScore, setHighScore] = useState(0)
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

    // Game loop reference
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

    const roles = ["> Full-Stack Developer", "> Psychology Graduate", "> UX Researcher", "> Problem Solver"]

    useEffect(() => {
        setIsVisible(true)

        // Load high score from localStorage if available
        const savedHighScore = localStorage.getItem("snakeHighScore")
        if (savedHighScore) {
            setHighScore(Number.parseInt(savedHighScore))
        }
    }, [])

    useEffect(() => {
        let currentRoleIndex = 0
        let currentCharIndex = 0
        let isDeleting = false

        const typewriterEffect = () => {
            const currentRole = roles[currentRoleIndex]

            if (!isDeleting) {
                setDisplayedText(currentRole.substring(0, currentCharIndex + 1))
                currentCharIndex++

                if (currentCharIndex === currentRole.length) {
                    setTimeout(() => {
                        isDeleting = true
                    }, 2000)
                }
            } else {
                setDisplayedText(currentRole.substring(0, currentCharIndex - 1))
                currentCharIndex--

                if (currentCharIndex === 0) {
                    isDeleting = false
                    currentRoleIndex = (currentRoleIndex + 1) % roles.length
                }
            }
        }

        const interval = setInterval(typewriterEffect, isDeleting ? 50 : 100)
        return () => clearInterval(interval)
    }, [])

    // Generate food in a position not occupied by the snake
    const generateFood = useCallback((): Position => {
        let newFood: Position
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            }
            // Check if the new food position overlaps with the snake
        } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))

        return newFood
    }, [snake])

    // Move the snake
    const moveSnake = useCallback(() => {
        if (!gameRunning || gameOver) return

        setSnake((currentSnake) => {
            const newSnake = [...currentSnake]
            const head = {...newSnake[0]}

            switch (direction) {
                case "UP":
                    head.y -= 1
                    break
                case "DOWN":
                    head.y += 1
                    break
                case "LEFT":
                    head.x -= 1
                    break
                case "RIGHT":
                    head.x += 1
                    break
            }

            // Check for wall collision (game over)
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                setGameOver(true)
                setGameRunning(false)
                updateHighScore(score)
                return currentSnake
            }

            // Check for self collision (game over)
            if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true)
                setGameRunning(false)
                updateHighScore(score)
                return currentSnake
            }

            // Add new head to the snake
            newSnake.unshift(head)

            // Check if snake ate food
            if (head.x === food.x && head.y === food.y) {
                // Increase score
                const newScore = score + 1
                setScore(newScore)

                // Generate new food
                setFood(generateFood())

                // Increase difficulty every 5 points
                if (newScore % 5 === 0 && newScore <= 25) {
                    const newLevel = Math.min(5, difficultyLevel + 1)
                    setDifficultyLevel(newLevel)
                    setGameSpeed(Math.max(70, 150 - (newLevel - 1) * 20))

                    // Restart game loop with new speed
                    if (gameLoopRef.current) {
                        clearInterval(gameLoopRef.current)
                        gameLoopRef.current = setInterval(moveSnake, Math.max(70, 150 - (newLevel - 1) * 20))
                    }
                }
            } else {
                // Remove tail if no food was eaten
                newSnake.pop()
            }

            return newSnake
        })
    }, [direction, food, gameRunning, gameOver, generateFood, score, difficultyLevel])

    // Update high score
    const updateHighScore = (currentScore: number) => {
        if (currentScore > highScore) {
            setHighScore(currentScore)
            localStorage.setItem("snakeHighScore", currentScore.toString())
        }
    }

    // Handle keyboard controls
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!gameRunning) return

            switch (e.key) {
                case "ArrowUp":
                    e.preventDefault()
                    setDirection((prev) => (prev !== "DOWN" ? "UP" : prev))
                    break
                case "ArrowDown":
                    e.preventDefault()
                    setDirection((prev) => (prev !== "UP" ? "DOWN" : prev))
                    break
                case "ArrowLeft":
                    e.preventDefault()
                    setDirection((prev) => (prev !== "RIGHT" ? "LEFT" : prev))
                    break
                case "ArrowRight":
                    e.preventDefault()
                    setDirection((prev) => (prev !== "LEFT" ? "RIGHT" : prev))
                    break
            }
        }

        window.addEventListener("keydown", handleKeyPress)
        return () => window.removeEventListener("keydown", handleKeyPress)
    }, [gameRunning])

    // Game loop
    useEffect(() => {
        if (gameRunning) {
            gameLoopRef.current = setInterval(moveSnake, gameSpeed)
            return () => {
                if (gameLoopRef.current) clearInterval(gameLoopRef.current)
            }
        }
    }, [moveSnake, gameRunning, gameSpeed])

    // Start game function
    const startGame = () => {
        setSnake(INITIAL_SNAKE)
        setFood(generateFood())
        setDirection("RIGHT")
        setScore(0)
        setGameOver(false)
        setGameRunning(true)
        setGameSpeed(150)
        setDifficultyLevel(1)
    }

    return (
            <section className="h-auto min-h-[90vh] flex flex-col items-center justify-center px-2 sm:px-4 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center">
                        {/* Left Content */}
                        <div
                            className={`space-y-6 md:space-y-8 transition-all duration-700 ${
                                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                            }`}
                            style={{transitionDelay: "300ms"}}
                        >
                            <div className="space-y-4">
                                <p className="text-slate-300 text-base md:text-lg animate-in fade-in duration-700 delay-300">
                                    Hi all, I am
                                </p>

                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-in slide-in-from-bottom duration-700 delay-500">
                                    Nikola Dziwusz
                                </h1>

                                <div
                                    className="text-lg sm:text-xl md:text-2xl text-blue-400 h-8 animate-in fade-in duration-700 delay-700">
                                    {displayedText}
                                    <span className="animate-pulse">|</span>
                                </div>
                            </div>

                            <div
                                className="space-y-3 text-slate-400 text-xs sm:text-sm md:text-base animate-in slide-in-from-bottom duration-700 delay-900">
                                <p>// complete your profile to unlock all features</p>
                                <p>// you can also download my CV below</p>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-blue-400">const</span>
                                    <span className="text-white">cvDownload</span>
                                    <span className="text-slate-300">=</span>
                                    <a
                                        href="/CV-NDZIWUSZ_2025.pdf"
                                        download={true}
                                        className="text-orange-400 hover:text-orange-300 p-0 h-auto font-mono underline transition-all duration-300 hover:scale-105"
                                    > {'nikola-dziwusz-cv-2025.pdf'}
                                    </a>
                                </div>
                            </div>

                            <div
                                className="space-y-3 text-slate-400 text-xs sm:text-sm md:text-base animate-in slide-in-from-bottom duration-700 delay-1100">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-blue-400">const</span>
                                    <span className="text-white">currentRole</span>
                                    <span className="text-slate-300">=</span>
                                    <span className="text-green-400">"Full-Stack Developer at Samsung"</span>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-blue-400">const</span>
                                    <span className="text-white">education</span>
                                    <span className="text-slate-300">=</span>
                                    <span className="text-green-400">"Business Psychology Master's"</span>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-blue-400">const</span>
                                    <span className="text-white">location</span>
                                    <span className="text-slate-300">=</span>
                                    <span className="text-green-400">"Wrocław, Poland"</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-blue-400">const</span>
                                    <span className="text-white">skills</span>
                                    <span className="text-slate-300">=</span>
                                    <span className="text-yellow-400">[</span>
                                </div>

                                <div className="ml-4 space-y-1">
                                    <div className="text-green-400">"React", "Node.js", "TypeScript",</div>
                                    <div className="text-green-400">"Vue.js", "MongoDB", "GraphQL",</div>
                                    <div className="text-green-400">"UX Research", "Psychology"</div>
                                </div>

                                <div className="text-yellow-400">]</div>

                                <div className="mt-6 pt-4 border-t border-slate-700">
                                    <p className="text-slate-500">// passionate about user-centric solutions</p>
                                    <p className="text-slate-500">// combining psychology with technology</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Game */}
                        <div
                            className={`w-full max-w-md mx-auto transition-all duration-700 ${
                                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                            }`}
                            style={{transitionDelay: "500ms"}}
                        >
                            <div
                                className="bg-gradient-to-br from-teal-800/30 to-teal-900/50 rounded-lg p-3 sm:p-4 md:p-6 border border-teal-700/50 backdrop-blur-sm hover:border-teal-600/50 transition-all duration-300">
                                <div className="space-y-4">
                                    {/* Game Header */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                        <div className="text-white font-mono text-sm md:text-base">
                                            <span className="text-teal-400">Snake</span>.game
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p className="text-slate-400 font-mono text-xs md:text-sm">// use keyboard arrows to play</p>
                                        </div>
                                    </div>

                                    {/* Game Stats */}
                                    <div
                                        className="flex flex-wrap justify-between items-center bg-slate-800/50 rounded px-2 sm:px-3 py-2 gap-2">
                                        <div className="flex items-center space-x-4">
                                            <div>
                                                <p className="text-xs text-slate-400">Score</p>
                                                <p className="text-lg text-white font-mono">{score}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400">High Score</p>
                                                <p className="text-lg text-white font-mono">{highScore}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400">Level</p>
                                            <p className="text-lg text-white font-mono">{difficultyLevel}</p>
                                        </div>
                                    </div>

                                    {/* Game Controls */}
                                    <div className="flex justify-end">
                                        <div className="grid grid-cols-3 gap-1">
                                            <div></div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-8 h-8 p-0 bg-slate-700 border-slate-600 text-white hover:bg-slate-600 font-mono transition-all duration-200 hover:scale-110"
                                                onClick={() => gameRunning && setDirection("UP")}
                                                disabled={!gameRunning}
                                            >
                                                ↑
                                            </Button>
                                            <div></div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-8 h-8 p-0 bg-slate-700 border-slate-600 text-white hover:bg-slate-600 font-mono transition-all duration-200 hover:scale-110"
                                                onClick={() => gameRunning && setDirection("LEFT")}
                                                disabled={!gameRunning}
                                            >
                                                ←
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-8 h-8 p-0 bg-slate-700 border-slate-600 text-white hover:bg-slate-600 font-mono transition-all duration-200 hover:scale-110"
                                                onClick={() => gameRunning && setDirection("DOWN")}
                                                disabled={!gameRunning}
                                            >
                                                ↓
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-8 h-8 p-0 bg-slate-700 border-slate-600 text-white hover:bg-slate-600 font-mono transition-all duration-200 hover:scale-110"
                                                onClick={() => gameRunning && setDirection("RIGHT")}
                                                disabled={!gameRunning}
                                            >
                                                →
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Game Board */}
                                    <div className="bg-slate-900 rounded border border-slate-600 p-1 sm:p-2 md:p-4">
                                        <div
                                            className="grid gap-0 mx-auto"
                                            style={{
                                                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                                                width: "min(90vw, 320px)",
                                                height: "min(90vw, 320px)",
                                                aspectRatio: "1",
                                            }}
                                        >
                                            {Array.from({length: GRID_SIZE * GRID_SIZE}).map((_, index) => {
                                                const x = index % GRID_SIZE
                                                const y = Math.floor(index / GRID_SIZE)
                                                const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
                                                const isFood = food.x === x && food.y === y
                                                const isHead = snake[0]?.x === x && snake[0]?.y === y

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`border border-slate-800/50 transition-all duration-150 ${
                                                            isSnake
                                                                ? isHead
                                                                    ? "bg-teal-400 shadow-sm"
                                                                    : "bg-teal-500"
                                                                : isFood
                                                                    ? "bg-orange-400 rounded-sm"
                                                                    : "bg-slate-900"
                                                        }`}
                                                        style={{minHeight: "6px", minWidth: "6px"}}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Game Info */}
                                    <div className="flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm gap-2">
                                        <p className="text-slate-400 font-mono">
                                            // {gameRunning ? "game running" : gameOver ? "game over" : "ready to play"}
                                        </p>
                                        <div className="flex space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`font-mono text-xs md:text-sm transition-colors duration-300 ${
                                                        i < difficultyLevel ? "text-teal-400" : "text-slate-600"
                                                    }`}
                                                    title={`Difficulty level ${i + 1}`}
                                                >
                        ●
                      </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Game Controls */}
                                    <div className="flex justify-center">
                                        <Button
                                            onClick={startGame}
                                            className="bg-orange-500 hover:bg-orange-600 text-white font-mono px-4 md:px-6 py-2 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                            disabled={gameRunning}
                                        >
                                            {gameOver ? "restart-game" : "start-game"}
                                        </Button>
                                    </div>

                                    {gameOver && (
                                        <div
                                            className="text-center p-3 bg-red-400/10 border border-red-400/20 rounded animate-in fade-in duration-300">
                                            <p className="text-red-400 font-mono text-sm">Game Over! Score: {score}</p>
                                            {score === highScore && score > 0 && (
                                                <p className="text-teal-400 font-mono text-sm mt-1">New High Score!</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div
                    className="w-full px-2 sm:px-4 absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row justify-between transition-opacity duration-1000"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transitionDelay: "1000ms",
                    }}
                >
                    <div className="flex items-center space-x-4 pb-3">
                        <span className="text-slate-400 font-mono text-xs md:text-sm">find me in:</span>
                        <div className="flex space-x-3">
                            <a
                                href="https://www.linkedin.com/in/nikola-dziwusz-4837a11a9/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                                aria-label="LinkedIn Profile"
                            >
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 pb-3">
                        <span className="text-slate-400 font-mono text-xs md:text-sm">@nikoladziwusz</span>
                        <a
                            href="https://github.com/NikolaDziwusz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="GitHub Profile"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
    )
}
