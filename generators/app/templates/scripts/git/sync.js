/* eslint-disable no-console */

// Core
import git from 'nodegit';

// Constants
import { GIT_ROOT, COMMIT_MESSAGE } from '../constants';

// Instruments
import { messages } from './messages';

const sync = (async function*() {
    try {
        const repository = await git.Repository.open(GIT_ROOT);

        const author = git.Signature.default(repository);

        while (true) {
            yield;
            const statuses = await repository.getStatus();

            if (statuses.length) {
                const parent = await repository.getHeadCommit();
                const index = await repository.refreshIndex();

                await index.addAll();
                await index.write();

                const oid = await index.writeTree();
                await repository.createCommit(
                    'HEAD',
                    author,
                    author,
                    COMMIT_MESSAGE,
                    oid,
                    [ parent ],
                );
                const origin = await repository.getRemote('origin');

                await origin.push(
                    [ 'refs/heads/lectrum-dev:refs/heads/lectrum-dev' ],
                    {
                        prune:     1,
                        callbacks: {
                            credentials(url, userName) {
                                return git.Cred.sshKeyFromAgent(userName);
                            },
                            certificateCheck() {
                                return 1;
                            },
                        },
                    },
                );
            }
        }
    } catch (error) {
        console.log('→ error', error);
    }
}());

setInterval(() => {
    sync.next();
}, 1000);
