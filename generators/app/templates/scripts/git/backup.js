/* eslint-disable no-console */

// Core
import git from 'nodegit';
import chalk from 'chalk';

// Constants
import { GIT_ROOT, BACKUP_BRANCH_NAME } from '../constants';

// Instruments
import { messages } from './messages';

export default async () => {
    console.log(messages.get(12));

    const repository = await git.Repository.open(GIT_ROOT);
    const references = await repository.getReferenceNames(3);
    const commitMessage = 'save progress before checkpoint synchronization';
    const author = git.Signature.default(repository);
    const defaultAuthor = git.Signature.now(
        'name_not_found',
        'email@not.found',
    );
    const checkpoints = references.filter((reference) => reference.includes('checkpoint'));
    const nextCheckpointBranchName = `${BACKUP_BRANCH_NAME}-${checkpoints.length
        + 1}`;

    const headCommit = await repository.getHeadCommit();
    const reference = await repository.createBranch(
        nextCheckpointBranchName,
        headCommit,
        false,
    );

    console.log(
        chalk.greenBright(
            `✓ Резервная ветка ${chalk.blueBright(
                nextCheckpointBranchName,
            )} создана.`,
        ),
    );

    await repository.checkoutBranch(reference);
    const parent = await repository.getHeadCommit();
    const index = await repository.refreshIndex();

    await index.addAll();
    await index.write();

    const oid = await index.writeTree();
    const commitId = await repository.createCommit(
        'HEAD',
        author || defaultAuthor,
        author || defaultAuthor,
        commitMessage,
        oid,
        [ parent ],
    );

    console.log(
        chalk.greenBright(
            `✓ Твой код сохранён в ветке ${chalk.blueBright(
                nextCheckpointBranchName,
            )}.`,
        ),
    );
    console.log(
        chalk.greenBright(
            `✓ Сообщение коммита: ${chalk.blueBright(commitMessage)}.`,
        ),
    );
    console.log(
        chalk.greenBright(
            `✓ Идентификатор коммита: ${chalk.blueBright(commitId)}.`,
        ),
    );
};
