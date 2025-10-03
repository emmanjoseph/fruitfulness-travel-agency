/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Enable static HTML export
  output: "export",

  // ✅ Disable Next.js image optimization (not supported on static hosting)
  images: {
    unoptimized: true,
  },

  // ✅ Ensure all routes have a trailing slash (important for static hosting)
  trailingSlash: true,
};

module.exports = nextConfig;
