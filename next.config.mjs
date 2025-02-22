/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lyajvnvhwgnscxcnnhhw.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/cabin-images/**',
                search: '',
            },
        ],
        domains: ['lh3.googleusercontent.com'],
    },
};

export default nextConfig;