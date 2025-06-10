// Alternative implementation using Resend (recommended email service)
// Uncomment and use this if you want to use Resend

/*
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(name: string, email: string, message: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <contact@yourdomain.com>',
      to: ['nikoladziwusz@gmail.com'],
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
              ${message.replace(/\n/g, '<br>')}
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
      throw new Error(error.message)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    throw error
  }
}
*/
