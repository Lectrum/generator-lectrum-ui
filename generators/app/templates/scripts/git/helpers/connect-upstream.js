/* eslint-disable no-console */

// Core
import git from 'nodegit';
import chalk from 'chalk';

// Instruments
import { messages } from '../messages';

export const connectUpstream = async (repository, upstreamUrl) => {
    console.log(messages.get(4));
    console.log(
        chalk.yellowBright(
            `→ Настраиваю связь с ${chalk.magenta('upstream')}: ${chalk.blue(
                upstreamUrl,
            )}.`,
        ),
    );

    const remote = await git.Remote.create(repository, 'upstream', upstreamUrl);

    console.log(
        chalk.greenBright(
            `✓ Связь с ${chalk.magenta(remote.name())} настроена.`,
        ),
    );
    console.log(messages.get(6));
};
