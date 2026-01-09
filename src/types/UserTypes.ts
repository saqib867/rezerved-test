import { StaticImageData } from "next/image";

export interface UserTypes {
  userId: string;
  name: string;
  img: StaticImageData;
  email: string;
  status: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  [key: string]: any;
}
