/* eslint-disable no-console */

// Core
import git from 'nodegit';

// Instruments
import { messages } from '../messages';

// Constants
import {
    LEAD_REMOTE_ORIGIN_REFERENCE,
    LEAD_REMOTE_UPSTREAM_REFERENCE,
    LEAD_BRANCH_NAME,
} from '../constants';

export const createLeadBranch = async (repository, isUpstream) => {
    console.log(messages.get(15));

    const headCommit = await repository.getHeadCommit();
    const reference = await repository.createBranch(
        LEAD_BRANCH_NAME,
        headCommit,
        false,
    );

    await repository.checkoutBranch(reference);

    const commit = await repository.getReferenceCommit(
        isUpstream
            ? LEAD_REMOTE_ORIGIN_REFERENCE
            : LEAD_REMOTE_UPSTREAM_REFERENCE,
    );

    await git.Reset.reset(repository, commit, 3);

    console.log(messages.get(16));
    console.log(messages.get(17));
};
