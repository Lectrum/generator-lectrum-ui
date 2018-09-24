/* eslint-disable no-console */

// Core
import git from 'nodegit';

// Constants
import {
    GIT_ROOT,
    SYNC_REMOTE_ORIGIN_REFERENCE,
    SYNC_REMOTE_UPSTREAM_REFERENCE,
    SYNC_LOCAL_REFERENCE,
    SYNC_BRANCH_NAME,
} from '../constants';

// Instruments
import { messages } from './messages';

export default async (isUpstream) => {
    const repository = await git.Repository.open(GIT_ROOT);
    const currentBranch = await repository.getCurrentBranch();
    const references = await repository.getReferenceNames(3);

    if (references.includes(SYNC_LOCAL_REFERENCE)) {
        if (!currentBranch.name().includes('dev')) {
            console.log(messages.get(13));

            const dev = await repository.getBranch(SYNC_LOCAL_REFERENCE);
            await repository.checkoutBranch(dev);

            console.log(messages.get(14));
        }
    } else {
        console.log(messages.get(15));

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

        console.log(messages.get(16));
        console.log(messages.get(17));
    }
};
