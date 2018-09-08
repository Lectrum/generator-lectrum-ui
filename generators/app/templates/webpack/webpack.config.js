// Configurations
import {
    generateDevelopmentConfiguration,
    generateProductionConfiguration,
} from './configurations';

export default () => {
    const { NODE_ENV } = process.env;

    const isDevelopment = NODE_ENV === 'development';

    return isDevelopment
        ? generateDevelopmentConfiguration()
        : generateProductionConfiguration();
};
