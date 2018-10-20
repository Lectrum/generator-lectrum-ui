// Instruments
import { SOURCE } from '../constants';

export const loadJavaScript = () => ({
    module: {
        rules: [
            {
                test:    /\.js$/,
                include: SOURCE,
                use:     [
                    'cache-loader',
                    {
                        loader:  'babel-loader',
                        options: {
                            compact: true,
                        },
                    },
                ],
            },
        ],
    },
});
