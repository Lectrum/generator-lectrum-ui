/* eslint-disable no-console */

// Core
import git from 'nodegit';

// Instruments
import { messages } from '../messages';

// Constants
import {
    SYNC_REMOTE_ORIGIN_REFERENCE,
    SYNC_REMOTE_UPSTREAM_REFERENCE,
    SYNC_BRANCH_NAME,
} from '../../constants';

export const createTutorBranch = async (repository, isUpstream) => {
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
};
