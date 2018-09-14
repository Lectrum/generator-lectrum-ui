/* eslint-disable no-console */

// Core
import git from 'nodegit';
import chalk from 'chalk';

// Constants
import {
    GIT_ROOT,
    SYNC_REMOTE_ORIGIN_REFERENCE,
    SYNC_REMOTE_UPSTREAM_REFERENCE,
    SYNC_LOCAL_REFERENCE,
    SYNC_BRANCH_NAME,
} from '../constants';

export default async (isUpstream) => {
    const repository = await git.Repository.open(GIT_ROOT);
    const currentBranch = await repository.getCurrentBranch();
    const references = await repository.getReferenceNames(3);

    if (references.includes(SYNC_LOCAL_REFERENCE)) {
        if (!currentBranch.name().includes('dev')) {
            console.log(
                chalk.yellowBright(
                    `→ Переключаюсь на ветку ${chalk.blueBright(
                        SYNC_BRANCH_NAME,
                    )}.`,
                ),
            );
            const dev = await repository.getBranch(SYNC_LOCAL_REFERENCE);
            await repository.checkoutBranch(dev);
            console.log(
                chalk.greenBright(
                    `✓ Переключился на ветку ${chalk.blueBright(
                        SYNC_BRANCH_NAME,
                    )}.`,
                ),
            );
        }
    } else {
        console.log(
            chalk.yellowBright(
                `→ Ветка ${chalk.blueBright(
                    SYNC_BRANCH_NAME,
                )} не найдена в локальном репозитории. Создаю локальную ветку ${chalk.blueBright(
                    SYNC_BRANCH_NAME,
                )}.`,
            ),
        );

        const headCommit = await repository.getHeadCommit();
        const reference = await repository.createBranch(
            SYNC_BRANCH_NAME,
            headCommit,
            false,
        );

        await repository.checkoutBranch(reference);

        const commit = await repository.getReferenceCommit(
            isUpstream
                ? SYNC_REMOTE_ORIGIN_REFERENCE
                : SYNC_REMOTE_UPSTREAM_REFERENCE,
        );

        await git.Reset.reset(repository, commit, 3);

        console.log(
            chalk.greenBright(
                `✓ Ветка ${chalk.blueBright(
                    SYNC_BRANCH_NAME,
                )} создана локально.`,
            ),
        );
        console.log(
            chalk.greenBright(
                `✓ Переключился на новосозданную ветку ${chalk.blueBright(
                    SYNC_BRANCH_NAME,
                )}.`,
            ),
        );
    }
};
