/* eslint-disable no-console */

// Core
import git from 'nodegit';

// Constants
import {
    GIT_ROOT,
    SYNC_REMOTE_ORIGIN_REFERENCE,
    SYNC_BRANCH_NAME,
    SYNC_REMOTE_UPSTREAM_REFERENCE,
    MASTER_REMOTE_UPSTREAM_REFERENCE,
} from '../constants';

// Instruments
import PACKAGE_JSON from '../../package.json';
import { messages } from './messages';

// Helpers
import { fetchAll, connectUpstream } from './helpers';

(async () => {
    console.log(messages.get(1));

    const repository = await git.Repository.open(GIT_ROOT);
    await fetchAll(repository);
    const references = await repository.getReferenceNames(3);
    const origin = await repository.getRemote('origin');
    const originUrl = origin.url().toLocaleLowerCase();
    const isSSH = originUrl.startsWith('git');
    const upstreamUrl = isSSH
        ? 'git@github.com:Lectrum/react-workshop.git'.toLocaleLowerCase()
        : PACKAGE_JSON.repository.url.toLocaleLowerCase();

    const isUpstream = origin.url().toLocaleLowerCase() === upstreamUrl;

    if (isUpstream) {
        // upstream
        if (!references.includes(SYNC_REMOTE_ORIGIN_REFERENCE)) {
            console.log(messages.get(2));

            return null;
        }
    } else {
        // fork
        console.log(messages.get(3));

        if (!references.includes(MASTER_REMOTE_UPSTREAM_REFERENCE)) {
            await connectUpstream(repository);
        } else {
            console.log(messages.get(7));
        }

        await fetchAll(repository);

        const upstreamReferences = await repository.getReferenceNames(3);

        if (!upstreamReferences.includes(SYNC_REMOTE_UPSTREAM_REFERENCE)) {
            console.log(messages.get(8));

            return null;
        }
    }

    console.log(messages.get(9));

    const statuses = await repository.getStatus();

    if (statuses.length) {
        await (await import('./backup')).default(repository);
    }

    await (await import('./lookup-branch-to-sync')).default(
        repository,
        isUpstream,
    );

    console.log(messages.get(10));

    await fetchAll(repository);

    await repository.mergeBranches(
        SYNC_BRANCH_NAME,
        isUpstream
            ? SYNC_REMOTE_ORIGIN_REFERENCE
            : SYNC_REMOTE_UPSTREAM_REFERENCE,
    );

    console.log(messages.get(11));
})();
