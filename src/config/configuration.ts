export default () => ({
  api: {
    baseUrl: process.env.API_BASE_URL,
    port: parseInt(process.env.API_PORT, 10) || 3000,
    enableDocs: process.env.API_ENABLE_DOCS === 'true',
    nodeEnv: process.env.NODE_ENV,
    bcrypt: {
      saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
    },
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    global: 'true' === process.env.JWT_IS_GLOBAL,
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  },
});
