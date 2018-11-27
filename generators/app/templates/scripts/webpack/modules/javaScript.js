// Instruments
import { SOURCE } from '../constants';

export const loadJavaScript = () => ({
    module: {
        rules: [
            {
                test:    /\.js$/,
                include: SOURCE,
                use:     [
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
