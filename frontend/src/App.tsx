import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes'; // Import the AppRoutes component
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes /> {/* Use AppRoutes here */}
      </Router>
      <ToastContainer />
    </Provider>
  );
};

export default App;
