import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import toJson from 'enzyme-to-json';
import {I18nextProvider} from "react-i18next";
import {Provider} from "react-redux";
import i18n from "./i18n";

Enzyme.configure({ adapter: new Adapter() });

// Global enzyme
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Global store
const middlewares = [thunk];
global.mockStore = configureMockStore(middlewares);

global.getJSON = (children) => {
    return toJson(children, {
        noKey: false,
        mode: 'deep'
    })
};

// Global providers
global.withI18n= fn => (
    <I18nextProvider i18n={i18n}>
        {fn}
    </I18nextProvider>
);

global.withProvider= (fn, store) => (
    <Provider store={store}>
        {fn}
    </Provider>
);

global.globalWrapper = (fn, store) => (
    withProvider(withI18n(fn), store)
);
