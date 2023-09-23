/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "image.tmdb.org",
				// port: "",
				// pathname: "/account123/**",
			},
		],
	},
};

module.exports = nextConfig
