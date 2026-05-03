import { SessionOptions } from "iron-session";

export interface SessionData {
  user: {
    id: string;
    username: string;
  };
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  user: {
    id: "",
    username: "",
  },
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: "made_printing_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
