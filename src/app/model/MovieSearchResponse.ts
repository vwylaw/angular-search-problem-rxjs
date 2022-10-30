import { Movie } from "./Movie";

export class MovieSearchResponse {
  Response: string;
  Search: Movie[];
  Error: string;
}
