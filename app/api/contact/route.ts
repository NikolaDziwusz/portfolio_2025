import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if Resend API key is available and valid
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey || apiKey === "re_123456789_abcdefghijklmnopqrstuvwxyz" || apiKey.startsWith("${")) {
      console.log("Resend API key not configured properly, simulating email send...")

      // Simulate email sending for development/demo
      console.log("Email would be sent:", {
        from: email,
        to: "nikoladziwusz@gmail.com",
        subject: `New contact form message from ${name}`,
        message: message,
      })

      return NextResponse.json(
        {
          success: true,
          message: "Message received! (Demo mode - email simulation)",
        },
        { status: 200 },
      )
    }

    try {
      // Dynamic import of Resend to avoid issues if not installed
      const { Resend } = await import("resend")
      const resend = new Resend(apiKey)

      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["nikoladziwusz@gmail.com"],
        subject: `New contact form message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 3px; border-left: 4px solid #007acc;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <div style="background: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; color: #0066cc;"><strong>Reply to:</strong> ${email}</p>
            </div>
            <p style="color: #666; font-size: 12px;">
              This message was sent from your portfolio contact form at ${new Date().toLocaleString()}.
            </p>
          </div>
        `,
        replyTo: email,
      })

      if (error) {
        console.error("Resend error:", error)

        // If it's an API key error, fall back to simulation
        if (error.message?.includes("API key") || error.message?.includes("Invalid")) {
          console.log("API key invalid, falling back to simulation...")
          return NextResponse.json(
            {
              success: true,
              message: "Message received! (Demo mode - API key needs configuration)",
            },
            { status: 200 },
          )
        }

        return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
      }

      console.log("Email sent successfully:", data)

      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully!",
        },
        { status: 200 },
      )
    } catch (emailError: any) {
      console.error("Email sending failed:", emailError)

      // If Resend package is not available or API key is invalid, simulate
      if (
        emailError.message?.includes("Cannot resolve module") ||
        emailError.message?.includes("API key") ||
        emailError.message?.includes("Invalid")
      ) {
        console.log("Falling back to email simulation...")
        return NextResponse.json(
          {
            success: true,
            message: "Message received! (Demo mode - email service not configured)",
          },
          { status: 200 },
        )
      }

      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
