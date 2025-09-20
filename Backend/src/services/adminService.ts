import adminModel from "../model/admin.model";

export const createAdmin = async (
  fullname: string,
  email: string,
  password: string,
  userType: string
) => {
  if (!fullname || !email || !password || !userType) {
    throw new Error("All fields are required");
  }
  const user = await adminModel.create({
    fullname: fullname,
    email: email,
    password: password,
    userType: userType,
  });
  return user;
};
