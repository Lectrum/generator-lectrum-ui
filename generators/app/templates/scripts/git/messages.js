// Core
import chalk from 'chalk';

// Constants
import { SYNC_BRANCH_NAME } from '../constants';

// Instruments
import PACKAGE_JSON from '../../package.json';

export const messages = new Map([
    [ 1, chalk.yellowBright('→ Начинаю процесс синхронизации.') ],
    [
        2,
        chalk.redBright(
            `→ Удалённая ветка ${chalk.blueBright(
                SYNC_BRANCH_NAME,
            )} не найдена в ${chalk.cyan('origin')}.`,
        ),
    ],
    [ 3, chalk.yellowBright(`→ Проверяю связь с ${chalk.magenta('upstream')}.`) ],
    [
        4,
        chalk.redBright(`→ Связь с ${chalk.magenta('upstream')} не настроена.`),
    ],
    [
        5,
        chalk.yellowBright(
            `→ Настраиваю связь с ${chalk.magenta('upstream')}: ${chalk.blue(
                PACKAGE_JSON.repository.url,
            )}.`,
        ),
    ],
    [
        6,
        chalk.yellowBright(
            `→ Ищу удалённую ветку ${chalk.blueBright(
                SYNC_BRANCH_NAME,
            )} в ${chalk.magenta('upstream')}.`,
        ),
    ],
    [ 7, chalk.greenBright(`✓ Связь с ${chalk.magenta('upstream')} настроена.`) ],
    [
        8,
        chalk.redBright(
            `→ Удалённая ветка с ${chalk.blueBright(
                SYNC_BRANCH_NAME,
            )} не найдена в ${chalk.magenta('upstream')}.`,
        ),
    ],
    [
        9,
        chalk.greenBright(
            `→ Удалённая ветка с ${chalk.blueBright(
                SYNC_BRANCH_NAME,
            )} найдена в ${chalk.magenta('upstream')}.`,
        ),
    ],
    [
        10,
        chalk.yellowBright(
            `→ Синхронизирую удалённую ветку ${chalk.blueBright(
                SYNC_BRANCH_NAME,
            )}.`,
        ),
    ],
    [
        11,
        chalk.greenBright(
            `✓ Прогресс верки ${chalk.blueBright(
                SYNC_BRANCH_NAME,
            )} синхронизирован.`,
        ),
    ],
    [
        12,
        chalk.yellowBright(
            '→ Найдены несохранённые изменения — создаю их резервную копию.',
        ),
    ],
    [
        13,
        chalk.greenBright(
            chalk.yellowBright(
                `→ Переключаюсь на ветку ${chalk.blueBright(
                    SYNC_BRANCH_NAME,
                )}.`,
            ),
        ),
    ],
    [
        14,
        chalk.greenBright(
            `✓ Переключился на ветку ${chalk.blueBright(SYNC_BRANCH_NAME)}.`,
        ),
    ],
    [
        15,
        chalk.yellowBright(
            `→ Ветка ${chalk.blueBright(
                SYNC_BRANCH_NAME,
            )} не найдена в локальном репозитории. Создаю локальную ветку ${chalk.blueBright(
                SYNC_BRANCH_NAME,
            )}.`,
        ),
    ],
    [
        16,
        chalk.greenBright(
            `✓ Ветка ${chalk.blueBright(SYNC_BRANCH_NAME)} создана локально.`,
        ),
    ],
    [
        17,
        chalk.greenBright(
            `✓ Переключился на новосозданную ветку ${chalk.blueBright(
                SYNC_BRANCH_NAME,
            )}.`,
        ),
    ],
]);
