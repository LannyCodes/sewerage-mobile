import * as request from './request';
import * as tab from './tab';
import * as faults from './faults';
import * as message from './message';

module.exports = {
    ...request,
    ...tab,
    faults: faults,
    message: message,
}