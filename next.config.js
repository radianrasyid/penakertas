/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    devIndicators: {
        buildActivity: true,
        buildActivityPosition: "bottom-left"
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "relaxed-caiman-strongly.ngrok-free.app",
                port: "",
                pathname: "**"
            }
        ]
    },
    webpack: (config, context) => {
        config.module.rules.push({
            test: /\.node$/,
            loader: "file-loader"
        })

        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;

        return config;
    }
}

module.exports = nextConfig
