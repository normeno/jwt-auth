export interface IUser {
  id: string,
  username: string;
  password: string;
  type: string;
}

export interface IDatabase {
  users: Array<IUser>;
}
