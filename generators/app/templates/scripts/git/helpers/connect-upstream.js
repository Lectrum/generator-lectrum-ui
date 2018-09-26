/* eslint-disable no-console */

// Core
import git from 'nodegit';
import chalk from 'chalk';

// Instruments
import { messages } from '../messages';

export const connectUpstream = async (repository, upstreamURl) => {
    console.log(messages.get(4));
    console.log(
        chalk.yellowBright(
            `→ Настраиваю связь с ${chalk.magenta('upstream')}: ${chalk.blue(
                upstreamURl,
            )}.`,
        ),
    );

    const remote = await git.Remote.create(repository, 'upstream', upstreamURl);

    console.log(
        chalk.greenBright(
            `✓ Связь с ${chalk.magenta(remote.name())} настроена.`,
        ),
    );
    console.log(messages.get(6));
};
