import nodemailer from 'nodemailer';

const emailOlvidePassword = async ({email, nombre, token}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const info = await transporter.sendMail({
    from: 'admin@neurospine.com',
    to: email,
    subject: 'Reestablecer Password',
    html: `
      <h1>Hola ${nombre}</h1>
      <p>Has solicitado reestablecer tu password</p>
      <p>Sigue el siguiente enlace para generar un nuevo password:</p>
      <a href="${process.env.FRONTEND_URL}/nuevo-password/${token}">Nuevo Password</a>
      <p>Si tú no creaste esta cuenta, puedes ignorarlo</p>
    `
  });
}

export default emailOlvidePassword;