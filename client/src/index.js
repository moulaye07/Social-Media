import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import './styles/index.scss';
import './styles_Konoha/css/index.css';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import { createRoot } from 'react-dom/client';
import { getUsers } from './actions/users.actions';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
)
store.dispatch(getUsers());


const root = createRoot(document.getElementById("root"));

root.render(
        <Provider store={store}>
          <App />
        </Provider>
        
);



