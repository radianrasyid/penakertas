/** @type {import('next').NextConfig} */
const nextConfig = {
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

        return config;
    }
}

module.exports = nextConfig
