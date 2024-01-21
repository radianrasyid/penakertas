/** @type {import('next').NextConfig} */
const nextConfig = {
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

        return config;
    }
}

module.exports = nextConfig
