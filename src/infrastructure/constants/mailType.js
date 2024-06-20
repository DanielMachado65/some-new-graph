'use strict';

module.exports = {
    vehicularMonitoring: {
        firstEmailAfterQuery: {
            type: 'vehicularMonitoringFirstEmailAfterQuery',
            timeToLoose: 5 * 1000,
            // timeToLoose: 10 * 60 * 1000
        },
        secondEmailAfterQuery: {
            type: 'vehicularMonitoringSecondEmailAfterQuery',
            // timeToLoose: 60 * 1000
            timeToLoose: 24 * 60 * 60 * 1000,
        },
    },
};

