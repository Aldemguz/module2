import axios from "axios";
import * as actionTypes from 'bucares/constants/propertiesActionTypes';
import { GET_PROPERTIES_URL } from "bucares/constants/url";

export const setPropertiesInfoPending = () => ({
  type: actionTypes.SET_PROPERTIES_INFO_PENDING
});

export const setPropertiesInfoData = (payload) => ({
  type: actionTypes.SET_PROPERTIES_INFO_DATA,
  payload
});

export const setPropertiesInfoRejected = () => ({
  type: actionTypes.SET_PROPERTIES_INFO_REJECTED
});

export const getPropertiesInfo = () => (
  (dispatch) => {
    dispatch(setPropertiesInfoPending());
    return axios.get(GET_PROPERTIES_URL).then(response => {
      dispatch(setPropertiesInfoData(response.data.data));
    }).catch(() => {
      dispatch(setPropertiesInfoRejected());
    })
  }
);