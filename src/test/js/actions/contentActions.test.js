import * as ContentActions  from "bucares/actions/contentActions";
import * as actionTypes from 'bucares/constants/actionTypes';
import {
  APP_CONTENT_URL,
  APP_CHECK_URL
} from "bucares/constants/url";
import expect from 'expect';
import moxios from 'moxios';
import { NOTIFICATION_ERROR } from 'bucares/constants/notificationActionsTypes'

describe('Content actions', () => {

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it('Test setUrl()', () => {
        const text = 'test';
        const expectedAction = {
            type: actionTypes.SET_URL,
            accepted: text
        };
        expect(ContentActions.setUrl(text)).toEqual(expectedAction)
    });

    it('Test cleanContent()', () => {
        const expectedAction = {
            type: actionTypes.CLEAN_CONTENT,
        };
        expect(ContentActions.cleanContent()).toEqual(expectedAction)
    });

    it('Test setContentsList()', () => {
      const list = ["test"]
        const expectedAction = {
            type: actionTypes.SET_CONTENT_LIST,
            list
        };
        expect(ContentActions.setContentsList(list)).toEqual(expectedAction)
    });

    it('Test deleteContentFromList()', () => {
      const url = "test";
        const expectedAction = {
            type: actionTypes.DELETE_CONTENT_FROM_LIST,
            url
        };
        expect(ContentActions.deleteContentFromList(url)).toEqual(expectedAction)
    });

    it('Test getContents() Success', () => {

        const list = ["test"];
        const store = mockStore({});

        moxios.stubRequest(APP_CONTENT_URL, {
            status: 200,
            response : {
              data: list
            }
        });

        const expectedActions = [
            {
                "type": actionTypes.SET_CONTENT_LIST,
                list
            }
        ];

        return store.dispatch(ContentActions.getContents()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    });

    it('Test getContents() Fail', () => {

      const store = mockStore({});

      moxios.stubRequest(APP_CONTENT_URL, {
          status: 204,
          response : {
            data: null
          }
      });

      const expectedActions = [
          {
              "type": actionTypes.SET_CONTENT_LIST,
              list: null
          }
      ];

      return store.dispatch(ContentActions.getContents()).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('Test checkContent() Success', () => {

    const text = "test";
    const store = mockStore({});
    const payload = {
      "url": text,
      "word": text
    }

    moxios.stubRequest(APP_CHECK_URL, {
        status: 201,
        response : {
          data: {
            state: text
          }
        }
    });

    const expectedActions = [
        {
          type: actionTypes.SET_URL
        }
    ];

    return store.dispatch(ContentActions.checkContent(payload)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('Test checkContent() Failed', () => {

    const text = "test";
    const store = mockStore({});
    const payload = {
      "url": text,
      "word": text
    }

    moxios.stubRequest(APP_CHECK_URL, {
        status: 500,
        response : {
          data: {
            state: text
          }
        }
    });

    const expectedActions = [
        {
          type: actionTypes.CLEAN_CONTENT
        },
        {
          type: NOTIFICATION_ERROR,
          message: "somethingWrong"
        }
    ];

    return store.dispatch(ContentActions.checkContent(payload)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('Test deleteContent() Success', () => {
    const url = "test";
    const payload = {
      url
    };
    const store = mockStore({});

    moxios.stubRequest(APP_CONTENT_URL, {
        status: 200,
        response: {
          data: {
            url
          }
        }
    });

    const expectedActions = [
      {
        type: actionTypes.DELETE_CONTENT_FROM_LIST,
        url
      }
    ];
  return store.dispatch(ContentActions.deleteContent(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
  })

});

it('Test deleteContent() Success', () => {
  const url = "test";
  const payload = {
    url
  };
  const store = mockStore({});

  moxios.stubRequest(APP_CONTENT_URL, {
      status: 204,
      response: {
        data: null
      }
  });

   const expectedActions = [
    ];
    return store.dispatch(ContentActions.deleteContent(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

});