export interface ICreateUserParams {
  name: string;
  warName: string;
  rank: string;
  phoneNumber: string;
  SU: string;
}

export interface IDeleteUserParams {
  userId: string;
}

export interface IUpdateUserParams extends ICreateUserParams {
  userId: string;
}
