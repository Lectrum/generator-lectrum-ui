/* eslint-disable no-console */

// Core
import git from 'nodegit';
import chalk from 'chalk';

// Constants
import {
    GIT_ROOT,
    SYNC_REMOTE_REFERENCE,
    SYNC_BRANCH_NAME,
} from '../constants';

(async () => {
    try {
        console.log(chalk.yellowBright('→ Начинаю процесс синхронизации.'));
        const repository = await git.Repository.open(GIT_ROOT);
        await repository.fetchAll({
            // TODO: investigate if prune is functional
            prune:     true,
            callbacks: {
                credentials(url, userName) {
                    return git.Cred.sshKeyFromAgent(userName);
                },
                certificateCheck() {
                    return 1;
                },
            },
        });
        const references = await repository.getReferenceNames(3);

        if (!references.includes(SYNC_REMOTE_REFERENCE)) {
            console.log(
                chalk.redBright(
                    `→ Удалённый репозиторий ${chalk.blueBright(
                        SYNC_BRANCH_NAME,
                    )} не найден.`,
                ),
            );

            return null;
        }

        const statuses = await repository.getStatus();

        if (statuses.length) {
            await (await import('./backup')).default();
        }

        await (await import('./sync-remote-lookup')).default();

        console.log(
            chalk.yellowBright(
                `→ Синхронизирую удалённую ветку ${chalk.blueBright(
                    SYNC_BRANCH_NAME,
                )}.`,
            ),
        );

        await repository.fetchAll({
            // TODO: investigate if prune is functional
            prune:     true,
            callbacks: {
                credentials(url, userName) {
                    return git.Cred.sshKeyFromAgent(userName);
                },
                certificateCheck() {
                    return 1;
                },
            },
        });

        await repository.mergeBranches(
            SYNC_BRANCH_NAME,
            `origin/${SYNC_BRANCH_NAME}`,
        );

        console.log(
            chalk.greenBright(
                `✓ Прогресс верки ${chalk.blueBright(
                    SYNC_BRANCH_NAME,
                )} синхронизирован.`,
            ),
        );
    } catch (error) {
        console.log(chalk.redBright(error));
    }
})();
