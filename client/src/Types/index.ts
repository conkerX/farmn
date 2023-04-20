import mongodb from "mongodb";

export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  farmId: string;
}

export interface Farm {
  _id: mongodb.ObjectId;
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  farmers: Farmer[];
  livestock: Livestock[];
  __v: number;
}

export interface Farmer {
  _id: mongodb.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Livestock {
  _id: mongodb.ObjectId;
  type: string;
  breed: string;
  dateOfBirth: Date;
  weight: number;
  gender: string;
  status: string;
  earTag: string;
  children: Livestock[];
  farmId: mongodb.ObjectId;
}

export interface CreateFarmBody {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
}
