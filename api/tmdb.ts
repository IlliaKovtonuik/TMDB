import axiosInstance from "./axiosConfig";
import {
  MoviesResponse,
  Movie,
  MovieDetails,
  MovieImagesResponse,
  SearchResult,
  Genre,
} from "@/types/movie";

export const fetchPopularMovies = async (
  page: number = 1
): Promise<Movie[]> => {
  const response = await axiosInstance.get<MoviesResponse>("/movie/popular", {
    params: {
      language: "en-US",
      page: page.toString(),
    },
  });
  return response.data.results;
};
export const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  const response = await axiosInstance.get<MovieDetails>(`/movie/${movieId}`, {
    params: {
      language: "en-US",
    },
  });
  return response.data;
};
export const fetchMovieImages = async (
  movieId: number
): Promise<MovieImagesResponse> => {
  const response = await axiosInstance.get<MovieImagesResponse>(
    `/movie/${movieId}/images`,
    {
      params: {
        include_image_language: "en,null",
      },
    }
  );
  return response.data;
};

export const searchMoviesAdvanced = async (
  query: string
): Promise<SearchResult> => {
  const encodedQuery = encodeURIComponent(query);

  const [movieRes, personRes, genresRes] = await Promise.all([
    axiosInstance.get(`/search/movie`, {
      params: {
        query: encodedQuery,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    }),
    axiosInstance.get(`/search/person`, {
      params: {
        query: encodedQuery,
        language: "en-US",
        page: 1,
      },
    }),
    axiosInstance.get(`/genre/movie/list`, {
      params: {
        language: "en-US",
      },
    }),
  ]);

  const result: SearchResult = {
    titleMatches: movieRes.data.results,
    actorMatches: [],
    genreMatches: [],
  };

  const person = personRes.data.results?.[0];
  if (person) {
    const creditsRes = await axiosInstance.get(
      `/person/${person.id}/movie_credits`,
      {
        params: {
          language: "en-US",
        },
      }
    );
    result.actorMatches = creditsRes.data.cast;
  }

  const matchedGenre = genresRes.data.genres.find((g: Genre) =>
    g.name.toLowerCase().includes(query.toLowerCase())
  );

  if (matchedGenre) {
    const genreRes = await axiosInstance.get(`/discover/movie`, {
      params: {
        with_genres: matchedGenre.id,
        sort_by: "popularity.desc",
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });
    result.genreMatches = genreRes.data.results;
  }

  return result;
};
