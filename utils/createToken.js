import jwt from "jsonwebtoken";

const createToken = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      name: user.name,
      email:user.email,
      admin:user.admin
    },
    process.env.SECRET
  );

  return token
};

export default createToken;
