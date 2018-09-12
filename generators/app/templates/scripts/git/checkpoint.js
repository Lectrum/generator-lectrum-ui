/* eslint-disable no-console */

// Core
import git from 'nodegit';
import chalk from 'chalk';

// Constants
import { GIT_ROOT } from '../constants';

(async () => {
    const repository = await git.Repository.open(GIT_ROOT);
    const currentBranch = await repository.getCurrentBranch();

    if (!currentBranch.name().includes('dev')) {
        await import('./commit-and-checkout');
    }

    await repository.fetchAll({
        callbacks: {
            credentials(url, userName) {
                return git.Cred.sshKeyFromAgent(userName);
            },
            certificateCheck() {
                return 1;
            },
        },
    });
    // const reference = await repository.fetch('dev');

    await repository.mergeBranches('dev', 'origin/dev');

    console.log(chalk.greenBright('✓ Прогресс верки dev синхронизирован.'));
})();
