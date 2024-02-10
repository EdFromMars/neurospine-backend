import nodemailer from 'nodemailer';

const emailRegistro = async ({email, nombre, token}) => {
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
    subject: 'Confirma tu correo',
    html: `
      <h1>Hola ${nombre}</h1>
      <p>Confirma tu correo para poder acceder al Sistema de Administración</p>
      <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar correo</a>
      <p>Si tú no creaste esta cuenta, puedes ignorarlo</p>
    `
  });
}

export default emailRegistro;