import bcrypt from 'bcrypt';

const passwordEncryption = async (plainPassword) => {
  console.log('plainPasword :>> ', plainPassword);
  const saltRounds = 10; // 10 salts is an efficient standard, more salts takes exponentionally longer
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
};

export default passwordEncryption;
