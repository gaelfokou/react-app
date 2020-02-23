import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import history from './history';
import App from './App';
import rootReducer from './reducers';
import { mount } from 'enzyme';

const store = createStore(rootReducer);

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(
//     <Provider store={store}>
//         <Router history={history}>
//             <App />
//         </Router>
//     </Provider>
//   , div);
//   ReactDOM.unmountComponentAtNode(div);
// });

const wrapper = mount(
  <Provider store={store}>
      <Router history={history}>
          <App />
      </Router>
  </Provider>
);

console.log(wrapper.debug());

it('renders 2 buttons', () => {
  const length = wrapper.find('button').length;

  expect(length).toEqual(2);
});

it('renders Add Post button', () => {
  const text = wrapper.find('button').at(0).text();

  expect(text).toEqual('Add Post');
});
