const BASE_URL = "http://localhost:3000/api";

export class ApiError extends Error {
  status?: number;
  network: boolean;

  constructor(
    message: string,
    opts: { status?: number; network?: boolean } = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.status = opts.status;
    this.network = opts.network ?? false;
  }
}

export interface User {
  id: number;
  email: string;
}
export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}
export interface RegisterResponse {
  message: string;
  user: User;
}
export interface MeResponse {
  user: User;
}
// ---- MOCK AUTH: không gọi API, nhập email + mật khẩu bất kỳ là đăng nhập được ----
const delay = (ms = 400) => new Promise<void>((r) => setTimeout(r, ms));

const MOCK_PREFIX = "mock-token.";

const makeUser = (email: string): User => {
  let hash = 0;
  for (const ch of email) hash = (hash * 31 + ch.charCodeAt(0)) % 100000;
  return { id: 1000 + hash, email };
};

export const authService = {
  login: async (email: string, _password: string): Promise<LoginResponse> => {
    await delay();
    return {
      message: "Đăng nhập thành công (mock)",
      token: `${MOCK_PREFIX}${encodeURIComponent(email)}`,
      user: makeUser(email),
    };
  },

  register: async (
    email: string,
    _password: string,
  ): Promise<RegisterResponse> => {
    await delay();
    return { message: "Đăng ký thành công (mock)", user: makeUser(email) };
  },

  // auto-login: giải token mock ra user
  me: async (token: string): Promise<MeResponse> => {
    await delay(150);
    if (!token.startsWith(MOCK_PREFIX)) {
      throw new ApiError("Token không hợp lệ", { status: 401 });
    }
    const email = decodeURIComponent(token.slice(MOCK_PREFIX.length));
    return { user: makeUser(email) };
  },
};
