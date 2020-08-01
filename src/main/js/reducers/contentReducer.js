import * as actionTypes from 'bucares/constants/actionTypes';
import lodash from "lodash";

const initialState = {
    currentUrlIsAccepted: false,
    urlAcceptedList: []
};

const findContent = (list, url) => {
    return list.findIndex((item) => {
      return item.url === url;
    });
  };

const contentReducer = (state, action) =>
{
    if (typeof state === 'undefined') {
        return initialState
    }

    const newState = Object.assign({},state);

    switch (action.type){

        case actionTypes.SET_URL: {
            newState.currentUrlIsAccepted = action.accepted;
            break;
        }

        case actionTypes.SET_CONTENT_LIST: {
          newState.urlAcceptedList = action.list;
          break;
        }

        case actionTypes.DELETE_CONTENT_FROM_LIST: {

            const index = findContent(newState.urlAcceptedList, action.url);
            if (index > -1) {
              let contentList = lodash.cloneDeep(newState.urlAcceptedList);
              contentList.splice(index, 1);
              newState.urlAcceptedList = contentList;
            }
      
            break;
        }

        case actionTypes.CLEAN_CONTENT: {
          newState.currentUrlIsAccepted = null;
          newState.urlAcceptedList = [];
          break;
        }

    }
    return newState;
};

export default contentReducer;
