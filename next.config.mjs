/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Erlaubt next/image, Bilder direkt von Sanitys Bild-CDN zu laden.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
