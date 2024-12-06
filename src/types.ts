export interface NavItem {
  label: string;
  href?: string;
}

export interface Book {
  book_title: string;
  author_name: string;
}

export interface Section {
  title: string;
  description?: string;
  books: Book[];
}

export type PostBookMap = {
  [bookTitle: string]: number;
};
