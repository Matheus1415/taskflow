import Swal from 'sweetalert2';
import type { SweetAlertOptions } from 'sweetalert2'

const COLORS = {
    bg: "#262626",
    bgSuccess: "#262626",
    text: "#fff",
    primary: "#a855f7", 
    error: "#ef4444",   
    warning: "#f59e0b", 
    info: "#3b82f6"   
};

const defaultToastOptions: SweetAlertOptions = {
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 7000,
    timerProgressBar: true,
    background: COLORS.bg,
    color: COLORS.text,
};

export const toast = {
    success: (title: string, message?: string) => {
        Swal.fire({
            ...defaultToastOptions,
            icon: 'success',
            iconColor: COLORS.primary,
            background: COLORS.bgSuccess,
            title: title,
            text: message,
        });
    },

    error: (title: string, message?: string) => {
        Swal.fire({
            ...defaultToastOptions,
            icon: 'error',
            iconColor: COLORS.error,
            title: title,
            text: message,
        });
    },

    warning: (title: string, message?: string) => {
        Swal.fire({
            ...defaultToastOptions,
            icon: 'warning',
            iconColor: COLORS.warning,
            title: title,
            text: message,
        });
    },

    info: (title: string, message?: string) => {
        Swal.fire({
            ...defaultToastOptions,
            icon: 'info',
            iconColor: COLORS.info,
            title: title,
            text: message,
        });
    }
};