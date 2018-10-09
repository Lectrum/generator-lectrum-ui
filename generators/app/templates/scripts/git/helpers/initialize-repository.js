/* eslint-disable no-console */
import git from 'nodegit';
import chalk from 'chalk';

// Constants
import { GIT_ROOT, GIT_HTTPS_URL } from '../constants';

// Instruments
import { messages } from '../messages';

export default async () => {
    console.log(messages.get(5));
    console.log(messages.get(18));
    const repository = await git.Repository.init(GIT_ROOT, 0);
    console.log(messages.get(19));
    const index = await repository.refreshIndex();

    await index.addAll();
    await index.write();

    const oid = await index.writeTree();

    const author = git.Signature.now('no_name', 'email@not.found');

    const commitId = await repository.createCommit(
        'HEAD',
        author,
        author,
        'initial commit',
        oid,
        [],
    );

    console.log(
        chalk.greenBright(
            `✓ История репозитория развёрнута. Идентификатор первого коммита: ${chalk.blueBright(
                commitId,
            )}.`,
        ),
    );
    console.log(messages.get(20));

    const remote = await git.Remote.create(repository, 'origin', GIT_HTTPS_URL);

    console.log(
        chalk.greenBright(
            `✓ Удалённый репозиторий ${chalk.cyan(
                remote.name(),
            )}: ${chalk.blueBright(commitId)}.`,
        ),
    );
};
