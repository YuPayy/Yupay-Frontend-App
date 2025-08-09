/** @type {import('next').NextConfig} */
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: true, // warning lebih cepat di dev

  webpack: (config) => {
    // Alias react-native ke react-native-web
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };

    // Optional: dukung file .web.js/.native.js
    config.resolve.extensions = [
      ".web.js",
      ".native.js",
      ".web.tsx",
      ...config.resolve.extensions,
    ];

    // Loader untuk .ttf (biar @expo/vector-icons gak error di Next.js)
    config.module.rules.push({
      test: /\.ttf$/,
      loader: "url-loader",
      include: path.resolve(
        __dirname,
        "node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons"
      ),
    });

    return config;
  },
};

export default nextConfig;
