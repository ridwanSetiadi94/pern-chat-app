export enum Gender {
  Male = "male",
  Female = "female",
}
export type SignupRequest = {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
};
