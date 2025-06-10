const fs = require("fs")
const path = require("path")
const readline = require("readline")

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Get the project root directory (where package.json is located)
const findProjectRoot = () => {
  let currentDir = __dirname

  // Go up from scripts directory to find package.json
  while (currentDir !== path.dirname(currentDir)) {
    if (fs.existsSync(path.join(currentDir, "package.json"))) {
      return currentDir
    }
    currentDir = path.dirname(currentDir)
  }

  // If not found, use the parent directory of scripts
  return path.dirname(__dirname)
}

const projectRoot = findProjectRoot()
console.log(`📁 Project root: ${projectRoot}`)

// Path to example and actual env files
const envExamplePath = path.join(projectRoot, ".env.example")
const envPath = path.join(projectRoot, ".env.local")

console.log("🔧 Environment Setup Utility")
console.log("============================")

// Check if .env.example exists
if (!fs.existsSync(envExamplePath)) {
  console.log(`❌ .env.example file not found at: ${envExamplePath}`)
  console.log("Creating a basic .env.example file...")

  const basicEnvExample = `# Email Service Configuration
# Get your API key from https://resend.com/api-keys
RESEND_API_KEY=re_your_actual_api_key_here

# Database Configuration (optional)
DATABASE_URL=postgresql://user:password@localhost:5432/database

# Public Environment Variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
`

  try {
    fs.writeFileSync(envExamplePath, basicEnvExample)
    console.log("✅ Created basic .env.example file")
  } catch (error) {
    console.error("❌ Failed to create .env.example file:", error.message)
    rl.close()
    return
  }


// Check if .env.local already exists
if (fs.existsSync(envPath)) {
  console.log("⚠️  A .env.local file already exists!")
  rl.question("Do you want to overwrite it? (y/N): ", (answer) => {
    if (answer.toLowerCase() !== "y") {
      console.log("❌ Setup cancelled. Existing .env.local file was not modified.")
      rl.close()
      return
    }
    setupEnv()
  })
} else {
  setupEnv()
}

function setupEnv() {
  // Read the example env file
  fs.readFile(envExamplePath, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading .env.example file:", err)
      rl.close()
      return
    }

    // Parse the example env file
    const envVars = data
      .split("\n")
      .filter((line) => line.trim() && !line.startsWith("#"))
      .map((line) => {
        const equalIndex = line.indexOf("=")
        if (equalIndex === -1) return null

        const key = line.substring(0, equalIndex).trim()
        const value = line.substring(equalIndex + 1).trim()
        return { key, value }
      })
      .filter(Boolean)

    if (envVars.length === 0) {
      console.log("⚠️  No environment variables found in .env.example")
      rl.close()
      return
    }

    console.log("\n📝 Please provide values for the following environment variables:")
    console.log("(Press Enter to use the default/example value)\n")

    // Process each environment variable
    processNextVar(envVars, 0, {})
  })
}

function processNextVar(envVars, index, results) {
  if (index >= envVars.length) {
    // All variables processed, write to .env file
    writeEnvFile(results)
    return
  }

  const { key, value } = envVars[index]

  // Skip variables that are comments or empty
  if (!key || key.startsWith("#")) {
    processNextVar(envVars, index + 1, results)
    return
  }

  // Provide helpful hints for specific variables
  let hint = ""
  if (key === "RESEND_API_KEY") {
    hint = " (Get from https://resend.com/api-keys)"
  } else if (key.includes("DATABASE")) {
    hint = " (Optional - for database features)"
  } else if (key.startsWith("NEXT_PUBLIC_")) {
    hint = " (Public variable - exposed to browser)"
  }

  rl.question(`${key}${hint}\nDefault: ${value}\nYour value: `, (answer) => {
    // Use provided answer or default value
    results[key] = answer.trim() || value
    processNextVar(envVars, index + 1, results)
  })
}

function writeEnvFile(envVars) {
  // Create content for .env file with comments
  const envContent = `# Environment variables for Nikola Dziwusz Portfolio
# Generated on ${new Date().toISOString()}

${Object.entries(envVars)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n")}

# Note: Keep this file secure and never commit it to version control
`

  // Write to .env.local file
  fs.writeFile(envPath, envContent, "utf8", (err) => {
    if (err) {
      console.error("❌ Error writing .env.local file:", err)
      rl.close()
      return
    }

    console.log("\n✅ .env.local file created successfully!")
    console.log(`📁 Location: ${envPath}`)
    console.log("\n📋 Summary:")
    console.log("- Contact form will work with your Resend API key")
    console.log("- If API key is not valid, form will work in demo mode")
    console.log("- Run 'npm run dev' to start the development server")
    console.log("\n⚠️  Remember to keep your .env.local file secure and never commit it to version control.")
    rl.close()
  })
}
