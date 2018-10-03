/* eslint-disable no-console */

// Core
import git from 'nodegit';
import { existsSync } from 'fs';

// Constants
import {
    GIT_ROOT,
    LEAD_REMOTE_ORIGIN_REFERENCE,
    LEAD_BRANCH_NAME,
    LEAD_REMOTE_UPSTREAM_REFERENCE,
    GIT_HTTPS_URL,
} from '../constants';

// Instruments
import { messages } from './messages';

// Helpers
import { fetchAll } from './helpers';

(async () => {
    try {
        console.log(messages.get(1));
        const isRepositoryInitialized = existsSync(GIT_ROOT);

        if (!isRepositoryInitialized) {
            await (await import('./helpers/initialize-repository')).default();
        }

        const repository = await git.Repository.open(GIT_ROOT);
        let origin = await repository.getRemote('origin');
        let originUrl = origin.url();
        const isClonedBySshConnection = originUrl.startsWith('git');
        const isFork = !originUrl.includes('Lectrum');

        if (isClonedBySshConnection) {
            await (await import('./helpers/convert-origin-connection-to-https')).default(
                repository,
                originUrl,
            );
            origin = await repository.getRemote('origin');
            originUrl = origin.url();
        }

        await fetchAll(repository);
        const allReferences = await repository.getReferenceNames(3);

        const isUpstream = originUrl === GIT_HTTPS_URL;

        if (
            isUpstream
            && !allReferences.includes(LEAD_REMOTE_ORIGIN_REFERENCE)
        ) {
            // upstream
            console.log(messages.get(2));

            return null;
        }

        if (isFork) {
            await (await import('./helpers/connect-fork-to-upstream')).default(
                repository,
                allReferences,
            );
        }

        console.log(messages.get(9));

        const statuses = await repository.getStatus();

        if (statuses.length) {
            await (await import('./helpers/backup')).default(repository);
        }

        await (await import('./helpers/lookup-branch-to-sync')).default(
            repository,
            isUpstream,
        );

        console.log(messages.get(10));

        await fetchAll(repository);

        await repository.mergeBranches(
            LEAD_BRANCH_NAME,
            isUpstream
                ? LEAD_REMOTE_ORIGIN_REFERENCE
                : LEAD_REMOTE_UPSTREAM_REFERENCE,
        );

        console.log(messages.get(11));
    } catch (error) {
        console.log('→ error', error);
    }
})();
