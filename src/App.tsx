import React from 'react';
import { Provider } from 'react-redux';
import { store } from './presentation/store/store';
import ItemList from './presentation/components/ItemList';
import ToastContainer from './presentation/components/ToastContainer';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <ItemList />
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;