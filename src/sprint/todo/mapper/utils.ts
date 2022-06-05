import * as bcrypt from 'bcrypt';

export const comparePasswords = async (developerPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, developerPassword);
};
