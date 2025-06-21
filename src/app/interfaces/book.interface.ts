export type TGenre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export type TBook = {
  title: string;
  author: string;
  genre: TGenre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
};

export type TBookMethods = {
  updateAvailability(number: number): void;
};
