const COOKIE_NAME = "warino_session";

export async function POST() {
  const response = Response.json({
    success: true,
    message: "با موفقیت از حساب خارج شدید.",
  });

  response.headers.set(
    "Set-Cookie",
    [
      `${COOKIE_NAME}=`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      "Max-Age=0",
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; "),
  );

  return response;
}
