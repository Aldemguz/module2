import React from 'react';
import AppVersion from 'bucares/components/AppVersion';

describe('AppVersion Component Test', () => {

    it('Snapshot AppVersion', () => {
        const store = mockStore({
            get : (property) => {
                const reducers = {
                    app : {
                        appInfo: {
                            version : "1.0.0"
                        },
                        appInfoLoading: false
                    }
                };
                return reducers[property];
            }
        });

        const appVersion = global.mount(
            globalWrapper(<AppVersion/>, store)
        );
        expect(getJSON(appVersion)).toMatchSnapshot()
    });

    it('Snapshot AppVersion with appInfo null', () => {
        const store = mockStore({
            get : (property) => {
                const reducers = {
                    app : {
                        appInfo: null,
                        appInfoLoading: false
                    }
                };
                return reducers[property];
            }
        });

        const appVersion = global.mount(
            globalWrapper(<AppVersion/>, store)
        );
        expect(getJSON(appVersion)).toMatchSnapshot()
    });
});