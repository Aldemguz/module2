import reducer from 'bucares/reducers/notificationReducer';
import * as types from 'bucares/constants/notificationActionsTypes';
import expect from 'expect'

describe('Content Reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({"open": false, "message": "", "type": null});
    });

    it('should handle NOTIFICATION_ERROR', () => {
        const message = "message";
        let response = {
          open: true,
          type: types.NOTIFICATION_ERROR,
          message
        };
        const app = {
            type: types.NOTIFICATION_ERROR,
            message
        };

        expect(reducer({ open: false, type: null, message: ""}, app))
          .toEqual(response)
    });

    it('should handle NOTIFICATION_SUCCESS', () => {
      const message = "message";
      let response = {
        open: true,
        type: types.NOTIFICATION_SUCCESS,
        message
      };
      const app = {
          type: types.NOTIFICATION_SUCCESS,
          message
      };

      expect(reducer({ open: false, type: null, message: ""}, app))
        .toEqual(response)
    });

    it('should handle CLOSE_NOTIFICATION', () => {
      let response = {
        open: false,
        type: null,
        message : ""
      };
      const app = {
          type: types.CLOSE_NOTIFICATION
      };

      expect(reducer({ open: false, type: null, message: ""}, app))
        .toEqual(response)
    });

});
