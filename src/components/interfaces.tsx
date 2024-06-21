import { Dispatch, SetStateAction } from "react";

export interface UserData {
  name: string;
  email: string;
}

export interface NavLinkProps {
  path: string;
  text: string;
}

export interface LogInProps {
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

export interface DogProps {
  dog: Dog;
  setFavorites?: Dispatch<SetStateAction<string>>;
}

export interface FavoritesProps {
  favorites: string;
  setFavorites: Dispatch<SetStateAction<string>>;
}

export interface PaginationProps {
  currentPage: number;
  setCurrentPage: (number: number) => void;
  totalDogs: number;
}

export interface SearchParams {
  breeds?: string[];
  zipCodes?: number[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string; // field:asc/desc
}

export interface SearchProps {
  breeds: string[];
  setFilters: Dispatch<SetStateAction<QueryParams>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
