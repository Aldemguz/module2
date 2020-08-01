import axios from "axios";
import * as actionTypes from 'bucares/constants/actionTypes';
import {APP_VERSION_URL} from "bucares/constants/url";

export const setAppInfoPending = () => ({
    type: actionTypes.SET_APP_INFO_PENDING
});

export const setAppInfoData = (payload) => ({
    type: actionTypes.SET_APP_INFO_DATA,
    payload
});

export const setAppInfoRejected = () => ({
    type: actionTypes.SET_APP_INFO_REJECTED
});

export const getAppInfo = () => (
    (dispatch) => {
        dispatch(setAppInfoPending());
        return axios.get(APP_VERSION_URL).then(response => {
            dispatch(setAppInfoData(response.data));
        }).catch(() => {
            dispatch(setAppInfoRejected());
        })
    }
);