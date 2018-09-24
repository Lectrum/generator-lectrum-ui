/* eslint-disable no-console */

// Core
import git from 'nodegit';
import chalk from 'chalk';

// Constants
import { GIT_SSH_URL } from '../../constants';

let debug = 0;

export const fetchAll = (repository) => repository.fetchAll({
    prune:     1,
    callbacks: {
        credentials(url, userName) {
            if (url === GIT_SSH_URL) {
                if (debug > 5) {
                    console.log(
                        chalk.redBrign('→ SSH agent is not configured.'),
                    );

                    return git.Cred.defaultNew();
                }
            }

            debug += 1;

            return git.Cred.sshKeyFromAgent(userName);
        },
        certificateCheck() {
            return 1;
        },
    },
});
