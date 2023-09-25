/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "image.tmdb.org",
			},
			{
				protocol: "https",
				hostname: "image.tmdb.org",
			},
		],
	},
	experimental: {
		serverActions: true,
	},
};

module.exports = nextConfig
