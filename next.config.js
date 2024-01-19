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
    }
}

module.exports = nextConfig
