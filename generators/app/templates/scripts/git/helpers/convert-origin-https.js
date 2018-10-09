// Core
import git from 'nodegit';

// Constants
import { GIT_HTTPS_URL } from '../constants';

export default async (repository) => {
    await git.Remote.delete(repository, 'origin');
    await git.Remote.setUrl(repository, 'origin', GIT_HTTPS_URL);
    await git.Remote.addFetch(
        repository,
        'origin',
        '+refs/heads/*:refs/remotes/origin/*',
    );
};
