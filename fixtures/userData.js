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

export { generateUserCredentials, VALID_LOGIN_PAYLOAD };
