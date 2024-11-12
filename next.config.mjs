/** @type {import('next').NextConfig} */
const nextConfig = {
        reactStrictMode: true,
        experimental: {
            swcPlugins: [["next-superjson-plugin",{}]]
        },

        images: {
            domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
        },
};

export default nextConfig;
