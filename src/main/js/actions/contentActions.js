import axios from "axios";
import * as actionTypes from 'bucares/constants/actionTypes';
import {
  APP_CONTENT_URL,
  APP_CHECK_URL
} from "bucares/constants/url";
import { setNotificationError } from "bucares/actions/notificationActions";
import i18n from "bucares/i18n"

const setUrl = (accepted) => ({
  type: actionTypes.SET_URL,
  accepted
});

export const cleanContent = () => ({
  type: actionTypes.CLEAN_CONTENT
})

const setContentsList = (list) => ({
  type: actionTypes.SET_CONTENT_LIST,
  list
})

const deleteContentFromList = (url) => ({
  type: actionTypes.DELETE_CONTENT_FROM_LIST,
  url
})

export const checkContent = (payload) => (
    (dispatch) => {
        return axios.post(APP_CHECK_URL, payload ,
          {
            headers: {
                'Content-type': 'application/json'
            }
          }).then(response => {
            dispatch(setUrl(response.data.state));
        }).catch(() => {
          dispatch(cleanContent());
          dispatch(setNotificationError(i18n.t("translation:somethingWrong")));
        })
    }
);

export const getContents = () => (
  (dispatch) => {
    return axios.get(APP_CONTENT_URL)
    .then(response => {
      dispatch(setContentsList(response.data.data));
    })
  }
)

export const deleteContent = (payload) => (
  (dispatch) => {
    return axios.delete(APP_CONTENT_URL, { data: payload },
      {
        headers: {
            'Content-type': 'application/json'
        }
      }).then(response => {
        dispatch(deleteContentFromList(response.data.data.url));
    }).catch(() => {
    })
  }
);