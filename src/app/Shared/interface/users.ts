export interface Users {
      id: number,
      firstName: string,
      lastName: string,
      age?: number,
      email: string,
     phone?: string,
     username: string,
      password: string,
      birthDate?: string,
      image: string,
     
}
export interface UserApiResponse {
  users: Users[];
  total: number;
  skip: number;
  limit: number;
}