import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

/**
 * Sentry has no DSN configured yet (see instrumentation.js /
 * instrumentation-client.js) - wrapping is still safe with no DSN set, the
 * SDK simply no-ops. Silent in dev, only uploads source maps when
 * SENTRY_AUTH_TOKEN is present (CI/production release builds).
 */
export default withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  widenClientFileUpload: true,
  webpack: { treeshake: { removeDebugLogging: true } },
});
