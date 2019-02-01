module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: _dirname + "./dist"
    },
    dectool:source-map,
    resolve:{
        extensions:[".ts",".tsx",".js",".json"]
    },
    module:{
        rules:[
            {test:/\.tsx?$/,loader:"awesome-typescript-loader"},
            {enforce:"pre",test:/\.js$/,loader:"source-map-loader"}
        ]
    },
    externals:{
        "react":"React",
        "react-dom":"ReactDom"
    }
};