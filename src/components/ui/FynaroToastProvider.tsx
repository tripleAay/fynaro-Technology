"use client";

import {
  ToastContainer,
} from "react-toastify";

export default function FynaroToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4500}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      draggable
      limit={4}
      hideProgressBar={false}
      theme="light"
      icon={false}
      className="fynaro-toast-container"
      toastClassName="fynaro-toast"
      bodyClassName="fynaro-toast-body"
      progressClassName="fynaro-toast-progress"
      aria-label="Fynaro notifications"
    />
  );
}