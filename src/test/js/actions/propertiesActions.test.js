import * as PropertiesActions  from "bucares/actions/propertiesActions";
import * as actionTypes from 'bucares/constants/propertiesActionTypes';
import expect from 'expect';
import moxios from 'moxios';

describe('Properties actions', () => {

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it('Test setPropertiesInfoData()', () => {
        const text = 'test';
        const expectedAction = {
            type: actionTypes.SET_PROPERTIES_INFO_DATA,
            payload: text
        };
        expect(PropertiesActions.setPropertiesInfoData(text)).toEqual(expectedAction)
    });

    it('Test setPropertiesInfoPending()', () => {
        const expectedAction = {
            type: actionTypes.SET_PROPERTIES_INFO_PENDING,
        };
        expect(PropertiesActions.setPropertiesInfoPending()).toEqual(expectedAction)
    });

    it('Test setPropertiesInfoRejected()', () => {
        const expectedAction = {
            type: actionTypes.SET_PROPERTIES_INFO_REJECTED,
        };
        expect(PropertiesActions.setPropertiesInfoRejected()).toEqual(expectedAction)
    });

    it('Test getPropertiesInfo() Failed', () => {

        const store = mockStore({});

        moxios.stubRequest("/api/properties", {
            status: 401,
            response : {}
        });

        const expectedActions = [
            {
                "type": actionTypes.SET_PROPERTIES_INFO_PENDING
            },
            {
                "type": actionTypes.SET_PROPERTIES_INFO_REJECTED
            },
        ];

        return store.dispatch(PropertiesActions.getPropertiesInfo()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    });
});