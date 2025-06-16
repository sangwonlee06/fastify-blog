import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async ({
  candidatePassword,
  hash,
}: {
  candidatePassword: string;
  hash: string;
}): Promise<boolean> => {
  return bcrypt.compare(candidatePassword, hash);
};
