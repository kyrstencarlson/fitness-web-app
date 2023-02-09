import { Theme, ThemeProvider } from '@mui/material';
import Swal, { SweetAlertIcon } from 'sweetalert2';

type ToastProps = {
    icon?: SweetAlertIcon;
    title?: string;
    theme?: Theme;
};

export const baseAlert = Swal.mixin({
    customClass: {
        container: 'sweet-alert-container'
    }
});

export const toast = ({ icon = 'success', title = 'success', theme }: ToastProps) => (baseAlert.fire({
    icon,
    title,
    background: theme?.palette.background.paper || '#fff',
    color: theme?.palette.text.primary || '#000',
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
}));


export const alert = baseAlert.mixin({
    showCancelButton: true
});
