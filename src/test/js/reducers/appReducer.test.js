import reducer from 'bucares/reducers/appReducer';
import * as types from 'bucares/constants/actionTypes';
import expect from 'expect'

describe('App Reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({"appInfo": null, "appInfoLoading": false});
    });

    it('should handle SET_APP_INFO_PENDING', () => {
        let response = {
            appInfo: null,
            appInfoLoading: true
        };

        const app = {
            type: types.SET_APP_INFO_PENDING
        };

        expect(reducer({ appInfo: null, appInfoLoading: false}, app)).toEqual(response)
    });

    it('should handle SET_APP_INFO_DATA', () => {

        const appInfo = {
            version: 1.0
        };

        let response = {
            appInfo: appInfo,
            appInfoLoading: false
        };

        const app = {
            type: types.SET_APP_INFO_DATA,
            payload: appInfo
        };

        expect(reducer({ appInfo: null, appInfoLoading: true}, app)).toEqual(response)
    });

    it('should handle SET_APP_INFO_REJECTED', () => {

        let response = {
            appInfo: null,
            appInfoLoading: false
        };

        const app = {
            type: types.SET_APP_INFO_REJECTED
        };

        expect(reducer({ appInfo: "with_value", appInfoLoading: false}, app)).toEqual(response)
    });
});
