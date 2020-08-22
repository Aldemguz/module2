import reducer from 'bucares/reducers/propertiesReducer';
import * as types from 'bucares/constants/propertiesActionTypes';
import expect from 'expect'

describe('App Reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({"propertiesInfo": { "appTag": ""}, "propertiesInfoLoading": false});
    });

    it('should handle SET_PROPERTIES_INFO_PENDING', () => {
        let response = {
            propertiesInfo: {
              appTag: ""
            },
            propertiesInfoLoading: true
        };

        const app = {
            type: types.SET_PROPERTIES_INFO_PENDING
        };

        expect(reducer({ propertiesInfo: { appTag: "" }, propertiesInfoLoading: false}, app)).toEqual(response)
    });

    it('should handle SET_PROPERTIES_INFO_DATA', () => {

        const propertiesInfo = {
            appTag: "test"
        };

        let response = {
            propertiesInfo: propertiesInfo,
            propertiesInfoLoading: false
        };

        const app = {
            type: types.SET_PROPERTIES_INFO_DATA,
            payload: {
              tag: "test"
            }
        };

        expect(reducer({ propertiesInfo: {appTag: ""}, propertiesInfoLoading: true}, app)).toEqual(response)
    });

    it('should handle SET_PROPERTIES_INFO_REJECTED', () => {

        let response = {
            propertiesInfo: null,
            propertiesInfoLoading: false
        };

        const app = {
            type: types.SET_PROPERTIES_INFO_REJECTED
        };

        expect(reducer({ propertiesInfo: { appTag: "value"}, propertiesInfoLoading: false}, app)).toEqual(response)
    });
});
