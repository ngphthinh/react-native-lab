import { ApiError } from "./authService";

const BOOKS_URL = "https://6ac86bb3fd7c536b1bd8fb29.mockapi.io/api/v1/books";

export interface Review {
  id: number;
  bookId: string;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
export interface Book {
  id: string;
  title: string;
  rating: number;
  category?: string;
  reviews: Review[];
}
export type NewReview = Omit<Review, "id" | "createdAt">;

async function http<T>(url: string, options: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new ApiError("Không kết nối được máy chủ", { network: true });
  }
  if (!res.ok) throw new ApiError("Có lỗi xảy ra", { status: res.status });
  return (await res.json()) as T;
}

export const bookService = {
  list: () => http<Book[]>(BOOKS_URL),
  get: (id: string) => http<Book>(`${BOOKS_URL}/${id}`),

  // Review nằm trong mảng `reviews` của sách → lấy sách mới nhất, thêm review, PUT lại.
  addReview: async (_token: string, review: NewReview): Promise<Review> => {
    const book = await http<Book>(`${BOOKS_URL}/${review.bookId}`);
    const created: Review = {
      ...review,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    await http<Book>(`${BOOKS_URL}/${review.bookId}`, {
      method: "PUT",
      body: JSON.stringify({
        ...book,
        reviews: [created, ...(book.reviews ?? [])],
      }),
    });
    return created;
  },
};
