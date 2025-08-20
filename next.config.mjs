/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
            {
                source: '/recreation/:path*',
                destination: '/entertainments/:path*',
                permanent: true,
            },
        ]
    },

    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'cp.pushkinopark.ru',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cp.pushkinopark.ru',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.kinomax.ru',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
