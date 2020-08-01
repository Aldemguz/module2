import * as AppActions  from "bucares/actions/appActions";
import * as actionTypes from 'bucares/constants/actionTypes';
import expect from 'expect';
import moxios from 'moxios';

describe('App actions', () => {

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it('Test setAppInfoData()', () => {
        const text = 'test';
        const expectedAction = {
            type: actionTypes.SET_APP_INFO_DATA,
            payload: text
        };
        expect(AppActions.setAppInfoData(text)).toEqual(expectedAction)
    });

    it('Test setAppInfoPending()', () => {
        const expectedAction = {
            type: actionTypes.SET_APP_INFO_PENDING,
        };
        expect(AppActions.setAppInfoPending()).toEqual(expectedAction)
    });

    it('Test setAppInfoRejected()', () => {
        const expectedAction = {
            type: actionTypes.SET_APP_INFO_REJECTED,
        };
        expect(AppActions.setAppInfoRejected()).toEqual(expectedAction)
    });

    it('Test getAppInfo() Failed', () => {

        const store = mockStore({});

        moxios.stubRequest("/api/version", {
            status: 401,
            response : {}
        });

        const expectedActions = [
            {
                "type": actionTypes.SET_APP_INFO_PENDING
            },
            {
                "type": actionTypes.SET_APP_INFO_REJECTED
            },
        ];

        return store.dispatch(AppActions.getAppInfo()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    });

    it('Test getAppInfo() Success', () => {

        const version = "1.0.0";
        const store = mockStore({});

        moxios.stubRequest("/api/version", {
            status: 200,
            response:  version
        });

        const expectedActions = [
            {
                "type": actionTypes.SET_APP_INFO_PENDING
            },
            {
                "type": actionTypes.SET_APP_INFO_DATA,
                "payload" : version
            }
        ];

        return store.dispatch(AppActions.getAppInfo()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
});