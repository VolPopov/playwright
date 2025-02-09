import { generateRandomString } from './utils';

const generateUserCredentials = length => {
  const baseString = generateRandomString(length);

  const username = baseString;
  const email = `${baseString}@gmail.com`;
  const password = `${baseString}123`;

  return { username, email, password };
};

const VALID_LOGIN_PAYLOAD = {
  EMAIL: 'filip@test.com',
  PASSWORD: 'test123',
};

const INVALID_SHORT_PASSWORD = {
  PASSWORD: "Pas",
};

const INVALID_EMAIL_FORMAT = {
  EMAIL: "InvalidEmailWithNoAtSymbol",
};

const INVALID_LONG_PASSWORD = {
  PASSWORD: "PasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPasPas",
};

export { generateUserCredentials, VALID_LOGIN_PAYLOAD, INVALID_SHORT_PASSWORD, INVALID_EMAIL_FORMAT, INVALID_LONG_PASSWORD };
