// Core
import git from 'nodegit';

export default async (repository, originUrl) => {
    const userName = originUrl.substring(
        originUrl.indexOf(':') + 1,
        originUrl.indexOf('/'),
    );

    const project = originUrl.substr(originUrl.indexOf('/') + 1);

    const httpsUrl = `https://github.com/${userName}/${project}`;

    await git.Remote.delete(repository, 'origin');
    await git.Remote.setUrl(repository, 'origin', httpsUrl);

    return httpsUrl;
};
