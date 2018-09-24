/* eslint-disable no-console */

// Constants
import { SYNC_LOCAL_REFERENCE } from '../../constants';

// Helpers
import { checkoutTutorBranch, createTutorBranch } from '.';

export default async (repository, isUpstream) => {
    const currentBranch = await repository.getCurrentBranch();
    const allReferencesNames = await repository.getReferenceNames(3);

    if (
        allReferencesNames.includes(SYNC_LOCAL_REFERENCE)
        && !currentBranch === SYNC_LOCAL_REFERENCE
    ) {
        await checkoutTutorBranch(repository);
    } else {
        await createTutorBranch(repository, isUpstream);
    }
};
