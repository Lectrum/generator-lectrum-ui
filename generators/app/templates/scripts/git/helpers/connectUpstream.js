/* eslint-disable no-console */

// Core
import git from 'nodegit';
import chalk from 'chalk';

// Instruments
import PACKAGE_JSON from '../../package.json';
import { messages } from '../messages';

export const connectUpstream = async (repository) => {
    console.log(messages.get(4));
    console.log(messages.get(5));

    const remote = await git.Remote.create(
        repository,
        'upstream',
        PACKAGE_JSON.repository.url,
    );

    console.log(
        chalk.greenBright(
            `✓ Связь с ${chalk.magenta(remote.name())} настроена.`,
        ),
    );
    console.log(messages.get(6));
};
