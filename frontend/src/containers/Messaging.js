import React from 'react';
import { toast, ToastContainer, Slide } from 'react-toastify';

import CloseButton from '../components/CloseButton';
import 'react-toastify/dist/ReactToastify.css';
import './messaging.css';

const message = (text, type) => {
  toast(text, { className: `toast ${type}` });
};

const Messaging = () => {
  return (
    <ToastContainer
      className="toast-wrapper"
      position="bottom-left"
      hideProgressBar
      autoClose={5000}
      pauseOnHover
      closeButton={<CloseButton />}
      transition={Slide}
      pauseOnFocusLoss={false}
    />
  );
};

export { Messaging, message };
