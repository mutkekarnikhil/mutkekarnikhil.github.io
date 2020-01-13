const path = require('path')

const config = {
    mode: 'production',
    entry: [
        path.resolve(__dirname, 'src/index.js'),
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'index.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: true,
                        },
                    },
                ],
            },
        ]
    }
}

module.exports = config