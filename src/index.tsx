import './wdyr'; // <--- first import
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './@store/configureStore';
import AppThemeProvider from './@themes/theme';
import { AppContainer } from './@routes/AppContainer';
import './index.css';
import * as serviceWorker from './serviceWorker';

// Open Source fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <AppContainer />
      </AppThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
