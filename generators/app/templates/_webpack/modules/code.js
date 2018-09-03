// Paths
import { SOURCE } from '../paths';

export const loadJavaScript = () => ({
    module: {
        rules: [
            {
                test:    /\.m?js$/,
                include: SOURCE,
                use:     'babel-loader',
            },
        ],
    },
});
