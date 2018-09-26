/* eslint-disable no-console */

// Core
import git from 'nodegit';
import chalk from 'chalk';

let debug = 0;

export const fetchAll = (repository) => repository.fetchAll({
    prune:     1,
    callbacks: {
        credentials(url, userName) {
            if (debug > 5) {
                console.log(
                    chalk.redBright('→ SSH agent is not configured.'),
                );

                return git.Cred.defaultNew();
            }

            debug += 1;

            return git.Cred.sshKeyFromAgent(userName);
        },
        certificateCheck() {
            return 1;
        },
    },
});
