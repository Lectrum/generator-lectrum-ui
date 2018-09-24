// Core
import git from 'nodegit';

export const fetchAll = (repository) => repository.fetchAll({
    prune:     1,
    callbacks: {
        credentials(url, userName) {
            return git.Cred.sshKeyFromAgent(userName);
        },
        certificateCheck() {
            return 1;
        },
    },
});
