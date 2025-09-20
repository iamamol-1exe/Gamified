import userModel from "../model/user.model";

export const createUser = async (
  fullname: string,
  email: string,
  password: string,
  school: string,
  rollno: string,
  standard: string,
  userType: string
) => {
  if (
    !fullname ||
    !email ||
    !password ||
    !school ||
    !rollno ||
    !standard ||
    !userType
  ) {
    throw new Error("All fields are required");
  }
  const user = await userModel.create({
    fullname: fullname,
    email: email,
    password: password,
    class: standard,
    rollNo: rollno,
    schoolName: school,
    userType: userType,
  });
  return user;
};
