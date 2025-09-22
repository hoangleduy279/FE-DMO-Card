const webpack = require('webpack');
const { parsed: env } = require('dotenv').config({
    path: '.env',
});

module.exports = async () => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        webpack(config: any) {
            config.module.rules.push({});
            config.plugins.push(new webpack.EnvironmentPlugin(env));
            return config;
        },
        typescript: {
            ignoreBuildErrors: false,
        },
        reactStrictMode: true,
        i18n: {
            locales: ['en', 'kr'],
            defaultLocale: 'kr',
            localeDetection: false,
        },
    };
    return nextConfig;
};
