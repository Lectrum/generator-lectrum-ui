/* eslint-disable no-console */

// Constants
import { SYNC_LOCAL_REFERENCE } from '../constants';

// Helpers
import { checkoutTutorBranch, createTutorBranch } from './helpers';

export default async (repository, isUpstream) => {
    const currentBranch = await repository.getCurrentBranch();
    const references = await repository.getReferenceNames(3);

    if (
        references.includes(SYNC_LOCAL_REFERENCE)
        && !currentBranch.name().includes('dev')
    ) {
        await checkoutTutorBranch(repository);
    } else {
        await createTutorBranch(repository, isUpstream);
    }
};
