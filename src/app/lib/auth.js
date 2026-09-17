import { jwtVerify } from "jose";

const COOKIE_NAME = "warino_session";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET در فایل .env تنظیم نشده است.");
  }

  return new TextEncoder().encode(secret);
}

export async function getCurrentUser() {
  try {
    const { cookies } = await import("next/headers");

    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get(COOKIE_NAME);

    if (!sessionCookie?.value) {
      return null;
    }

    const { payload } = await jwtVerify(sessionCookie.value, getSecretKey());

    if (!payload.userId || !payload.role) {
      return null;
    }

    return {
      id: Number(payload.userId),
      role: payload.role,
    };
  } catch (error) {
    console.error("خطا در بررسی session:", error);

    return null;
  }
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return user;
}

export async function requireSeller() {
  const user = await requireUser();

  if (user.role !== "SELLER" && user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  return user;
}
