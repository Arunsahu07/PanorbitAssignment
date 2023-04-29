const API_URL = 'https://panorbit.in/api/users.json';

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  profilepicture: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export const getUserList = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.users as User[];
};
