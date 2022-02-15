/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { Toastify, ToastifyProps } from 'components/Toastify';

export default function setNotification(
  props: ToastifyProps,
  options?: ToastOptions,
) {
  toast[props.type](<Toastify {...props} />, { ...options, type: 'default' });
}
