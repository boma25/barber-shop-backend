export const config = () => {
  const values ={
    PORT: parseInt(process.env.PORT),
    DB_URI:process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET||'secretKey',
    JWT_LIFE_SPAN: process.env.JWT_LIFE_SPAN||'5h'
  }
  return values
};
