// Constants
import { SOURCE } from '../../constants';

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
