import React, {Suspense} from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { I18nextProvider } from 'react-i18next';
import store from 'bucares/store';
import i18n from "bucares/i18n";
import HomeView  from 'bucares/components/HomeView';
import "bucares/utils/validators";
import Notification from "bucares/components/Notification";

render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <Suspense fallback="">
                <Notification/>
                <HomeView/>
            </Suspense>
        </I18nextProvider>
    </Provider>,
    document.getElementById('react')
);
