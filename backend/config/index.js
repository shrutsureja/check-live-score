import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const mongoURI = process.env.MONGOURI;
const jwtSecret = process.env.JWTSECRET;

export {
  PORT,
  mongoURI,
  jwtSecret,
}