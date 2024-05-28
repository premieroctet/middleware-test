import redirectionioMiddleware from "@redirection.io/vercel-middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextFetchEvent, NextRequest } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const handleI18nRouting = createIntlMiddleware({
    defaultLocale: "en",
    locales: ["en", "fr"],
    localePrefix: "as-needed",
  });

  const response = handleI18nRouting(req);

  if (response.status !== 200) {
    return response;
  }

  const rewriteUrl = response.headers.get("x-middleware-rewrite");

  if (rewriteUrl) {
    const newUrl = new URL(rewriteUrl!);

    const request = new NextRequest(newUrl, {
      method: req.method,
      headers: req.headers,
      body: req.body,
      cache: req.cache,
      credentials: req.credentials,
      integrity: req.integrity,
      keepalive: req.keepalive,
      mode: req.mode,
      redirect: req.redirect,
      referrer: req.referrer,
      referrerPolicy: req.referrerPolicy,
      signal: req.signal,
      geo: req.geo,
      ip: req.ip,
    });

    // @ts-ignore
    const responseRio = await redirectionioMiddleware(request, event);

    response.headers.forEach((value, key) => {
      responseRio.headers.set(key, value);
    });

    return responseRio;
  }

  // @ts-ignore
  return redirectionioMiddleware(req, event);
}

export const config = {
  unstable_allowDynamic: ["/node_modules/@redirection.io/**"],
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
