/* eslint-disable no-console */

// Instruments
import { messages } from '../messages';

// Constants
import { LEAD_LOCAL_REFERENCE } from '../constants';

export const checkoutLeadBranch = async (repository) => {
    console.log(messages.get(13));

    const local = await repository.getBranch(LEAD_LOCAL_REFERENCE);
    await repository.checkoutBranch(local);

    console.log(messages.get(14));
};
