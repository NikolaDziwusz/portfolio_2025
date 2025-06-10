const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🧹 Cleaning build cache...")

// Get the project root directory
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

// Setup environment variables automatically
const setupEnvironment = () => {
  const envLocalPath = path.join(projectRoot, ".env.local")
  const envExamplePath = path.join(projectRoot, ".env.example")

  // Check if .env.local already exists
  if (fs.existsSync(envLocalPath)) {
    console.log("✅ .env.local file already exists")
    return
  }

  console.log("🔧 Setting up environment variables...")

  // Create a basic .env.local with working defaults
  const envContent = `# Environment variables for Nikola Dziwusz Portfolio
# Generated automatically on ${new Date().toISOString()}

# Email Service Configuration
# The contact form will work in demo mode with this placeholder
RESEND_API_KEY=re_demo_key_placeholder

# Database Configuration (using existing environment variables)
DATABASE_URL=${process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/database"}
POSTGRES_URL=${process.env.POSTGRES_URL || "postgresql://user:password@localhost:5432/database"}

# Public Environment Variables
NEXT_PUBLIC_SITE_URL=https://nikola-dziwusz-portfolio.vercel.app

# Development Settings
NODE_ENV=production
`

  try {
    fs.writeFileSync(envLocalPath, envContent)
    console.log("✅ Created .env.local file with default values")
    console.log("📧 Contact form will work in demo mode")
    console.log("💡 To enable real email sending, update RESEND_API_KEY in .env.local")
  } catch (error) {
    console.log("⚠️  Could not create .env.local file:", error.message)
    console.log("📧 Contact form will still work in demo mode")
  }
}

// Setup environment first
setupEnvironment()

// Remove .next directory
const nextDir = path.join(projectRoot, ".next")
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true })
  console.log("✅ Removed .next directory")
} else {
  console.log("ℹ️  .next directory not found")
}

console.log("📦 Starting build process...")

try {
  // Run the build command from the project root
  execSync("npm run build", {
    stdio: "inherit",
    cwd: projectRoot,
  })

  console.log("✅ Build completed successfully!")
  console.log("\n🚀 Next steps:")
  console.log("- Your portfolio is ready to deploy!")
  console.log("- Contact form will work in demo mode")
  console.log("- To enable real emails, get a Resend API key from https://resend.com")
  console.log("- Update RESEND_API_KEY in .env.local with your real API key")
} catch (error) {
  console.error("❌ Build failed:", error.message)
  console.log("\n🔍 Troubleshooting:")
  console.log("- Make sure all dependencies are installed: npm install")
  console.log("- Check your environment variables")
  console.log("- Verify your code doesn't have syntax errors")
  process.exit(1)
}
