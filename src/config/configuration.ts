export default () => {
  const databaseURI = process.env.MONGODB_URI;
  const port = parseInt(`${process.env.PORT}`, 10) || 3000;

  if (!databaseURI) {
    throw new Error('MONGODB_URI is not defined');
  }

  return {
    port,
    databaseURI,
    qwe: 345,
  };
};
