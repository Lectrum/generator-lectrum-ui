/* eslint-disable no-console */

// Core
import git from 'nodegit';
import chalk from 'chalk';

// Constants
import {
    GIT_ROOT,
    SYNC_REMOTE_ORIGIN_REFERENCE,
    SYNC_BRANCH_NAME,
    SYNC_REMOTE_UPSTREAM_REFERENCE,
    MASTER_REMOTE_UPSTREAM_REFERENCE,
} from '../constants';

// Entities
import PACKAGE_JSON from '../../package.json';

(async () => {
    console.log(chalk.yellowBright('→ Начинаю процесс синхронизации.'));
    const repository = await git.Repository.open(GIT_ROOT);
    await repository.fetchAll({
        // TODO: investigate if prune is functional
        prune:     true,
        callbacks: {
            credentials(url, userName) {
                return git.Cred.sshKeyFromAgent(userName);
            },
            certificateCheck() {
                return 1;
            },
        },
    });
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
            console.log(
                chalk.redBright(
                    `→ Удалённая ветка ${chalk.blueBright(
                        SYNC_BRANCH_NAME,
                    )} не найдена в ${chalk.cyan('origin')}.`,
                ),
            );

            return null;
        }
    } else {
        // fork
        console.log(
            chalk.yellowBright(
                `→ Проверяю связь с ${chalk.magenta('upstream')}.`,
            ),
        );

        if (!references.includes(MASTER_REMOTE_UPSTREAM_REFERENCE)) {
            console.log(
                chalk.redBright(
                    `→ Связь с ${chalk.magenta('upstream')} не настроена.`,
                ),
            );

            console.log(
                chalk.yellowBright(
                    `→ Настраиваю связь с ${chalk.magenta(
                        'upstream',
                    )}: ${chalk.blue(PACKAGE_JSON.repository.url)}.`,
                ),
            );

            const remote = await git.Remote.create(
                repository,
                'upstream',
                PACKAGE_JSON.repository.url,
            );

            console.log(
                chalk.greenBright(
                    `✓ Связь с ${chalk.magenta(remote.name())} настроена.`,
                ),
            );

            console.log(
                chalk.yellowBright(
                    `→ Ищу удалённую ветку ${chalk.blueBright(
                        SYNC_BRANCH_NAME,
                    )} в ${chalk.magenta('upstream')}.`,
                ),
            );
        } else {
            console.log(
                chalk.greenBright(
                    `✓ Связь с ${chalk.magenta('upstream')} настроена.`,
                ),
            );
        }

        await repository.fetchAll({
            // TODO: investigate if prune is functional
            prune:     true,
            callbacks: {
                credentials(url, userName) {
                    return git.Cred.sshKeyFromAgent(userName);
                },
                certificateCheck() {
                    return 1;
                },
            },
        });

        const upstreamReferences = await repository.getReferenceNames(3);

        if (!upstreamReferences.includes(SYNC_REMOTE_UPSTREAM_REFERENCE)) {
            console.log(
                chalk.redBright(
                    `→ Удалённая ветка с ${chalk.blueBright(
                        SYNC_BRANCH_NAME,
                    )} не найдена в ${chalk.magenta('upstream')}.`,
                ),
            );

            return null;
        }
    }

    console.log(
        chalk.greenBright(
            `→ Удалённая ветка с ${chalk.blueBright(
                SYNC_BRANCH_NAME,
            )} найдена в ${chalk.magenta('upstream')}.`,
        ),
    );

    const statuses = await repository.getStatus();

    if (statuses.length) {
        await (await import('./backup')).default();
    }

    await (await import('./lookup-branch-to-sync')).default(isUpstream);

    console.log(
        chalk.yellowBright(
            `→ Синхронизирую удалённую ветку ${chalk.blueBright(
                SYNC_BRANCH_NAME,
            )}.`,
        ),
    );

    await repository.fetchAll({
        // TODO: investigate if prune is functional
        prune:     true,
        callbacks: {
            credentials(url, userName) {
                return git.Cred.sshKeyFromAgent(userName);
            },
            certificateCheck() {
                return 1;
            },
        },
    });

    await repository.mergeBranches(
        SYNC_BRANCH_NAME,
        isUpstream
            ? SYNC_REMOTE_ORIGIN_REFERENCE
            : SYNC_REMOTE_UPSTREAM_REFERENCE,
    );

    console.log(
        chalk.greenBright(
            `✓ Прогресс верки ${chalk.blueBright(
                SYNC_BRANCH_NAME,
            )} синхронизирован.`,
        ),
    );
})();
