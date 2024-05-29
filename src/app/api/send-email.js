import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body; // Simplify for testing

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'oneebfaisal@gmail.com',
        pass: 'tkzrucshlngnxjhk'
      }
    });

    const mailOptions = {
      from: 'oneebfaisal@gmail.com',
      to: 'oneebfaisal@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email from Next.js'
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent: ' + info.response });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
