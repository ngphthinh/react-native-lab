import type { Review } from '../services/bookService';

export const averageRating = (reviews: Review[]): number =>
  reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0;
