import bodyParser from "body-parser";

/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParser: true,
  },
};

export default nextConfig;
