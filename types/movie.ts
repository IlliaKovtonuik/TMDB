export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface MovieDetails extends Movie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  runtime: number;
  status: string;
  genres: Genre[];
  overview: string;
  production_countries: ProductionCountry[];
  production_companies: ProductionCompany[];
  tagline: string;
  homepage: string;
  budget: number;
  revenue: number;
}
export interface ImageData {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieImagesResponse {
  id: number;
  backdrops: ImageData[];
  posters: ImageData[];
}

export interface SearchResult {
  titleMatches: Movie[];
  actorMatches: Movie[];
  genreMatches: Movie[];
}
