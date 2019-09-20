const {override, fixBabelImports, addWebpackAlias, addBabelPlugin} = require('customize-cra');
const path = require("path")

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addWebpackAlias({
        views: path.resolve(__dirname, "./src/views"),
        components: path.resolve(__dirname, './src/components'),
        utils: path.resolve(__dirname, './src/utils'),
        api: path.resolve(__dirname, './src/api'),
        stores: path.resolve(__dirname, './src/stores'),
        static: path.resolve(__dirname, './src/statics'),
        historys: path.resolve(__dirname, './src/history'),
    }),
    addBabelPlugin(
        ["@babel/plugin-proposal-decorators", {"legacy": true}],
        ["@babel/plugin-proposal-class-properties", {"loose": true}]
    )
);
