/* eslint-disable no-console */

// Core
import chalk from 'chalk';

// Constants
import { SYNC_LOCAL_REFERENCE } from '../../constants';

// Helpers
import { checkoutTutorBranch, createTutorBranch } from '.';

export default async (repository, isUpstream) => {
    const currentBranch = await repository.getCurrentBranch();
    const allReferencesNames = await repository.getReferenceNames(3);

    if (
        allReferencesNames.includes(SYNC_LOCAL_REFERENCE)
        && currentBranch.name() !== SYNC_LOCAL_REFERENCE
    ) {
        await checkoutTutorBranch(repository);
    } else if (
        allReferencesNames.includes(SYNC_LOCAL_REFERENCE)
        && currentBranch.name() === SYNC_LOCAL_REFERENCE
    ) {
        console.log(
            chalk.greenBright(
                `→ Выбрана ветка ${chalk.blueBright(SYNC_LOCAL_REFERENCE)}`,
            ),
        );
    } else {
        await createTutorBranch(repository, isUpstream);
    }
};
