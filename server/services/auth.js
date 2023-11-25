import jwt from "jsonwebtoken";
const secret = "ksdflsdSdsf";
export const setUser = (user) => {
  try {
    return jwt.sign({ _id: user._id, user }, secret);
  } catch (error) {}
};

export const getUser = (token) => {
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch (error) {}
};
