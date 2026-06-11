/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // NOTA: El proxy al backend se maneja via Route Handler en app/api/[...path]/route.ts
  // que reenvía el header Authorization explícitamente (los rewrites lo eliminan).
  // URL del backend configurable via NEXT_PUBLIC_BACKEND_URL (default: http://localhost:3000)
};

export default nextConfig;
