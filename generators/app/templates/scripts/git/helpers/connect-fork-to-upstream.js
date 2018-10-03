/* eslint-disable no-console */

// Constants
import {
    GIT_HTTPS_URL,
    MASTER_REMOTE_UPSTREAM_REFERENCE,
    LEAD_REMOTE_UPSTREAM_REFERENCE,
} from '../../constants';

// Instruments
import { messages } from '../messages';

// Helpers
import { fetchAll, connectUpstream } from '.';

export default async (repository, allReferences) => {
    console.log(messages.get(3));

    if (!allReferences.includes(MASTER_REMOTE_UPSTREAM_REFERENCE)) {
        await connectUpstream(repository, GIT_HTTPS_URL);
    } else {
        console.log(messages.get(7));
    }

    await fetchAll(repository);

    const upstreamReferences = await repository.getReferenceNames(3);

    if (!upstreamReferences.includes(LEAD_REMOTE_UPSTREAM_REFERENCE)) {
        console.log(messages.get(8));

        return null;
    }
};
