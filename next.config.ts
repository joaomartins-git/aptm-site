import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async redirects() {
    return [
      // Old APTM homepage
      {
        source: "/aptmao/aptm",
        destination: "/",
        permanent: true,
      },

      // Old website root
      {
        source: "/aptmao",
        destination: "/",
        permanent: true,
      },

      {
        source: "/aptmao/",
        destination: "/",
        permanent: true,
      },

      // Old contact page
      {
        source: "/aptmao/contacts",
        destination: "/contact",
        permanent: true,
      },

      // Old statutes page
      {
        source: "/aptmao/aptm/statutes",
        destination: "/about/estatutos",
        permanent: true,
      },

      // Old therapist/member listing
      {
        source: "/aptmao/listings",
        destination: "/contact/terapeutas",
        permanent: true,
      },

      // Old publications
      {
        source: "/aptmao/publications/index",
        destination: "/news",
        permanent: true,
      },

      {
        source: "/aptmao/publications/index/page/:page",
        destination: "/news",
        permanent: true,
      },

      {
        source: "/aptmao/publications/view",
        destination: "/news",
        permanent: true,
      },

      // Old news
      {
        source: "/aptmao/news/view",
        destination: "/news",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'www.instagram.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
      {
        protocol: "https",
        hostname: "gh0o3tzomb.ufs.sh",
      },

    ],
  },

};



export default nextConfig;
