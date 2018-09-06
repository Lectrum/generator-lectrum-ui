/* Setup files module.
**
** This module will be executed before each test.
**
** This module contains a code to configure or set up the
** testing environment before each test. Since every test
** runs in its own environment, these scripts will be
** executed in the testing environment immediately before
** executing the test code itself.
**
** This module executes before setupFramework module.
**
*/

import { LocalStorage } from './mocks';
import './mocks/html';

const { NODE_ENV } = process.env;

global.__ENV__ = NODE_ENV;
global.__DEV__ = NODE_ENV === 'development';
global.__PROD__ = NODE_ENV === 'production';
global.__TEST__ = NODE_ENV === 'test';

global.localStorage = new LocalStorage();
global.__ = __;
