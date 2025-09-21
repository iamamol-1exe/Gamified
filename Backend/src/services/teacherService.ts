import teacherModel from "../model/teacher.model";

export const createTeacher = async (
  fullname: string,
  email: string,
  password: string,
  school: string,
  userType: string
) => {
  if ((!fullname || !email || !password || !school|| !userType)) {
    throw new Error("All fields are required");
  }
  const user = await teacherModel.create({
    fullname: fullname,
    email: email,
    password: password,
    schoolName: school,
    userType: userType,
  });
  return user;
};
