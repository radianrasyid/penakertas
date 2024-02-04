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
                protocol: "http",
                hostname: "localhost",
                port: "52000",
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
