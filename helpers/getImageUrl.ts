import { defaultImageUrl } from "@/helpers/const";
export const getImageUrl = (
  backdropPath?: string | null,
  posterPath?: string | null
): string => {
  switch (true) {
    case Boolean(backdropPath):
      return `https://image.tmdb.org/t/p/original${backdropPath}`;
    case Boolean(posterPath):
      return `https://image.tmdb.org/t/p/original${posterPath}`;
    default:
      return defaultImageUrl;
  }
};
