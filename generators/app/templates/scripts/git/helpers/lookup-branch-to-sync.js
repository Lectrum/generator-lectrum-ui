/* eslint-disable no-console */

// Core
import chalk from 'chalk';

// Constants
import { LEAD_LOCAL_REFERENCE } from '../constants';

// Helpers
import { checkoutLeadBranch, createLeadBranch } from '.';

export default async (repository, isUpstream) => {
    const currentBranch = await repository.getCurrentBranch();
    const allReferencesNames = await repository.getReferenceNames(3);

    if (
        allReferencesNames.includes(LEAD_LOCAL_REFERENCE)
        && currentBranch.name() !== LEAD_LOCAL_REFERENCE
    ) {
        await checkoutLeadBranch(repository);
    } else if (
        allReferencesNames.includes(LEAD_LOCAL_REFERENCE)
        && currentBranch.name() === LEAD_LOCAL_REFERENCE
    ) {
        console.log(
            chalk.greenBright(
                `→ Выбрана ветка ${chalk.blueBright(LEAD_LOCAL_REFERENCE)}`,
            ),
        );
    } else {
        await createLeadBranch(repository, isUpstream);
    }
};
