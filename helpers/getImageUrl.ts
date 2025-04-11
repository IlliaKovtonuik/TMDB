export const getImageUrl = (
  backdropPath?: string | null,
  posterPath?: string | null
): string => {
  if (backdropPath) {
    return `https://image.tmdb.org/t/p/original${backdropPath}`;
  }
  if (posterPath) {
    return `https://image.tmdb.org/t/p/original${posterPath}`;
  }
  return "https://via.placeholder.com/500x300?text=No+Image";
};
