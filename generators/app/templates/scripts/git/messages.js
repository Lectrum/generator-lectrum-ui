// Core
import chalk from 'chalk';

// Constants
import { LEAD_BRANCH_NAME, GIT_HTTPS_URL } from './constants';

export const messages = new Map([
    [ 1, chalk.yellowBright('→ Начинаю процесс синхронизации.') ],
    [
        2,
        chalk.redBright(
            `→ Удалённая ветка ${chalk.blueBright(
                LEAD_BRANCH_NAME,
            )} не найдена в ${chalk.cyan('origin')}.`,
        ),
    ],
    [ 3, chalk.yellowBright(`→ Проверяю связь с ${chalk.magenta('upstream')}.`) ],
    [
        4,
        chalk.redBright(`→ Связь с ${chalk.magenta('upstream')} не настроена.`),
    ],
    [ 5, chalk.redBright('→ Локальный репозиторий не найден.') ],
    [
        6,
        chalk.yellowBright(
            `→ Ищу удалённую ветку ${chalk.blueBright(
                LEAD_BRANCH_NAME,
            )} в ${chalk.magenta('upstream')}.`,
        ),
    ],
    [ 7, chalk.greenBright(`✓ Связь с ${chalk.magenta('upstream')} настроена.`) ],
    [
        8,
        chalk.redBright(
            `→ Удалённая ветка ${chalk.blueBright(
                LEAD_BRANCH_NAME,
            )} не найдена в ${chalk.magenta('upstream')}.`,
        ),
    ],
    [
        9,
        chalk.greenBright(
            `→ Удалённая ветка ${chalk.blueBright(
                LEAD_BRANCH_NAME,
            )} найдена в ${chalk.magenta('upstream')}.`,
        ),
    ],
    [
        10,
        chalk.yellowBright(
            `→ Синхронизирую удалённую ветку ${chalk.blueBright(
                LEAD_BRANCH_NAME,
            )}.`,
        ),
    ],
    [
        11,
        chalk.greenBright(
            `✓ Прогресс ветки ${chalk.blueBright(
                LEAD_BRANCH_NAME,
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
                    LEAD_BRANCH_NAME,
                )}.`,
            ),
        ),
    ],
    [
        14,
        chalk.greenBright(
            `✓ Переключился на ветку ${chalk.blueBright(LEAD_BRANCH_NAME)}.`,
        ),
    ],
    [
        15,
        chalk.yellowBright(
            `→ Ветка ${chalk.blueBright(
                LEAD_BRANCH_NAME,
            )} не найдена в локальном репозитории. Создаю локальную ветку ${chalk.blueBright(
                LEAD_BRANCH_NAME,
            )}.`,
        ),
    ],
    [
        16,
        chalk.greenBright(
            `✓ Ветка ${chalk.blueBright(LEAD_BRANCH_NAME)} создана локально.`,
        ),
    ],
    [
        17,
        chalk.greenBright(
            `✓ Переключился на новосозданную ветку ${chalk.blueBright(
                LEAD_BRANCH_NAME,
            )}.`,
        ),
    ],
    [ 18, chalk.yellowBright('→ Инициализирую новый локальный репозиторий.') ],
    [
        19,
        chalk.greenBright(
            '✓ Новый локальный репозиторий инициализирован успешно.',
        ),
    ],
    [
        20,
        chalk.yellowBright(
            `→ Подключаю удалённый репозиторий ${chalk.cyan(
                'origin',
            )} по адресу: ${chalk.blueBright(GIT_HTTPS_URL)}`,
        ),
    ],
    [ 21, chalk.greenBright('✓ Процесс синхронизации активизирован.') ],
]);
