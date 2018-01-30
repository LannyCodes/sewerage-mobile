import * as request from './request';
import * as tab from './tab';
import * as faults from './faults';

module.exports = {
    ...request,
    ...tab,
    faults: faults,
}