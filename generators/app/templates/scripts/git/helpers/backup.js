/* eslint-disable no-console */

// Core
import git from 'nodegit';
import chalk from 'chalk';

// Constants
import { BACKUP_BRANCH_NAME, COMMIT_PHRASE_START } from '../constants';

// Instruments
import { messages } from '../messages';

// Helpers
import { getCurrentTime } from '../helpers';

export default async (repository) => {
    console.log(messages.get(12));

    const references = await repository.getReferenceNames(3);
    const author = git.Signature.default(repository);
    const fallbackAuthor = git.Signature.now(
        'name_not_found',
        'email@not.found',
    );
    const checkpoints = references.filter((reference) => reference.includes(BACKUP_BRANCH_NAME));
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
    const commitMessage = `${COMMIT_PHRASE_START}: ${chalk.blue(
        getCurrentTime(),
    )};`;

    await index.addAll();
    await index.write();

    const oid = await index.writeTree();
    const commitId = await repository.createCommit(
        'HEAD',
        author || fallbackAuthor,
        author || fallbackAuthor,
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
            `✓ Идентификатор коммита: ${chalk.blueBright(commitId)}.`,
        ),
    );
};
