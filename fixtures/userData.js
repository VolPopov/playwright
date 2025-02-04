import { generateRandomString } from './utils';

const generateUserCredentials = length => {
  const baseString = generateRandomString(length);

  const username = baseString;
  const email = `${baseString}@gmail.com`;
  const password = `${baseString}123`;

  return { username, email, password };
};

export { generateUserCredentials };
