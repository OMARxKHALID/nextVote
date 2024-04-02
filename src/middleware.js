export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/create", "/edit/:path*", "/vote/:path*"],
};
