/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
       domains: ['images.unsplash.com' , 'plus.unsplash.com' 
        , "lh3.googleusercontent.com"
       ],
       deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
};

export default nextConfig;
