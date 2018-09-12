/* eslint-disable no-console */

// Core
import git from 'nodegit';
import chalk from 'chalk';

// Constants
import { GIT_ROOT } from '../constants';

(async () => {
    const repository = await git.Repository.open(GIT_ROOT);
    const index = await repository.refreshIndex();

    await index.addAll();
    await index.write();

    const oid = await index.writeTree();
    const head = await git.Reference.nameToId(repository, 'HEAD');
    const parent = await repository.getCommit(head);

    // Identify author and committer
    const author = git.Signature.default(repository);
    const committer = git.Signature.default(repository);

    const message = 'save progress before switching to checkpoint.';

    const commitId = await repository.createCommit(
        'HEAD',
        author,
        committer,
        message,
        oid,
        [ parent ],
    );

    const currentBranch = await repository.getCurrentBranch();

    console.log(
        chalk.greenBright(
            `→ Твой код сохранён в ветке ${chalk.blueBright(
                currentBranch.shorthand(),
            )}.`,
        ),
    );
    console.log(
        chalk.greenBright(
            `→ Сообщение коммита: ${chalk.yellowBright(message)}`,
        ),
    );
    console.log(
        chalk.greenBright(
            `→ Идентификатор коммита: ${chalk.yellowBright(commitId)}`,
        ),
    );
    console.log(
        chalk.greenBright(`→ Переключаюсь на ветку ${chalk.blueBright('dev')}`),
    );

    await repository.checkoutBranch('dev');
})();

// var remoteBranchName = "REMOTE-BRANCH-NAME";

// nodegit.Repository.open(path.resolve(__dirname, '../.git'))
//     .then(function(repo) {
//         return repo
//             .getHeadCommit()
//             .then(function(targetCommit) {
//                 return repo.createBranch(remoteBranchName, targetCommit, false);
//             })
//             .then(function(reference) {
//                 return repo.checkoutBranch(reference, {});
//             })
//             .then(function() {
//                 return repo.getReferenceCommit(
//                     'refs/remotes/origin/' + remoteBranchName,
//                 );
//             })
//             .then(function(commit) {
//                 nodegit.Reset.reset(repo, commit, 3, {});
//             });
//     })
//     .done(function() {
//         console.log('All done!');
//     });
