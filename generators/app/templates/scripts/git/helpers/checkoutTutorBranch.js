/* eslint-disable no-console */

// Instruments
import { messages } from '../messages';

// Constants
import { SYNC_LOCAL_REFERENCE } from '../constants';

export const checkoutTutorBranch = async (repository) => {
    console.log(messages.get(13));

    const dev = await repository.getBranch(SYNC_LOCAL_REFERENCE);
    await repository.checkoutBranch(dev);

    console.log(messages.get(14));
};
