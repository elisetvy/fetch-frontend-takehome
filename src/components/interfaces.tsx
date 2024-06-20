import { Dispatch, SetStateAction } from "react";

export interface UserData {
  name: string;
  email: string;
}

export interface AuthProps {
  setCurrUser: (user: string) => void;
}

export type IDs = string[];

export interface DogsProps {
  setFavorites: Dispatch<SetStateAction<string>>;
}

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface FavoritesProps {
  favorites: string;
  setFavorites: (id: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  setCurrentPage: (number: number) => void;
  totalDogs: number;
}

export interface QueryParams {
  breeds?: string[];
  zipCodes?: number[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string; // field:asc/desc
}
