import { toast } from 'react-toastify';

export const toastifyError = (title, duration, theme) => {
  toast.error(title, {
    position: 'bottom-right',
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};

export const toastifySuccess = (title, duration, theme) => {
  toast.success(title, {
    position: 'bottom-right',
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};
