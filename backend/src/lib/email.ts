import nodemailer from "nodemailer";

// Sends booking notification emails via Gmail SMTP (or any SMTP host).
// If SMTP_PASS is not set, emails are skipped silently — bookings still
// save to the database and appear in the admin dashboard either way.

function getTransport() {
  if (!process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendBookingNotification(booking: {
  customerName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  location: string;
  packageId: string;
  specialRequirements?: string | null;
}) {
  const transport = getTransport();
  if (!transport) {
    console.log("[email] SMTP not configured — skipping notification email.");
    return;
  }

  const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

  await transport.sendMail({
    from: `"Divya Photo Studio Bookings" <${process.env.SMTP_USER}>`,
    to,
    subject: `New Booking Inquiry — ${booking.customerName} (${booking.eventDate})`,
    html: `
      <h2>New Booking Inquiry</h2>
      <p><strong>Name:</strong> ${booking.customerName}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Event Type:</strong> ${booking.eventType}</p>
      <p><strong>Date:</strong> ${booking.eventDate} at ${booking.eventTime}</p>
      <p><strong>Location:</strong> ${booking.location}</p>
      <p><strong>Package:</strong> ${booking.packageId}</p>
      <p><strong>Special Requirements:</strong> ${booking.specialRequirements || "—"}</p>
    `,
  });
}

export async function sendCustomerConfirmation(to: string, customerName: string) {
  const transport = getTransport();
  if (!transport) return;

  await transport.sendMail({
    from: `"Divya Photo Studio" <${process.env.SMTP_USER}>`,
    to,
    subject: "Booking Inquiry Received — Divya Photo Studio",
    html: `
      <h2>Thank you, ${customerName}!</h2>
      <p>Your booking inquiry sent successfully. Our team will contact you shortly to confirm the details.</p>
      <p style="color:#C8A24A;font-weight:bold;">Divya Photo Studio</p>
      <p>Sharad Gulabrao Deore · 9923124639 · divyahdphotostudio@gmail.com</p>
    `,
  });
}
