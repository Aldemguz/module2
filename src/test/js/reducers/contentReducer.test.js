import reducer from 'bucares/reducers/contentReducer';
import * as types from 'bucares/constants/actionTypes';
import expect from 'expect'

describe('Content Reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({"currentUrlIsAccepted": false, "urlAcceptedList": []});
    });

    it('should handle SET_URL', () => {
        const accepted = "ACCEPTED";
        let response = {
          currentUrlIsAccepted: accepted,
          urlAcceptedList: []
        };
        const app = {
            type: types.SET_URL,
            accepted
        };

        expect(reducer({ currentUrlIsAccepted: false, urlAcceptedList: []}, app))
          .toEqual(response)
    });

    it('should handle SET_CONTENT_LIST', () => {
      const list = ["test1", "test2"];
      let response = {
        currentUrlIsAccepted: false,
        urlAcceptedList: list
      };
      const app = {
          type: types.SET_CONTENT_LIST,
          list
      };

      expect(reducer({ currentUrlIsAccepted: false, urlAcceptedList: []}, app))
        .toEqual(response)
    });

    it('should handle DELETE_CONTENT_FROM_LIST', () => {
      const list = ["test1","test3"];
      let response = {
        currentUrlIsAccepted: false,
        urlAcceptedList: list
      };
      const app = {
          type: types.DELETE_CONTENT_FROM_LIST,
          url: "test2"
      };

      expect(reducer({ currentUrlIsAccepted: false, urlAcceptedList: 
        ["test1", "test3"]}, app))
        .toEqual(response)
    });

    it('should handle CLEAN_CONTENT', () => {
      let response = {
        currentUrlIsAccepted: null,
        urlAcceptedList: []
      };
      const app = {
          type: types.CLEAN_CONTENT
      };

      expect(reducer({ currentUrlIsAccepted: false, urlAcceptedList: ["test1"]}, app))
        .toEqual(response)
    });

});
