import toast from 'react-hot-toast';

export interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const TOAST_STYLES = {
  base: {
    fontSize: '14px',
    fontWeight: '500',
  },
  success: {
    background: '#10b981',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
  },
  error: {
    background: '#ef4444',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
  },
  info: {
    background: '#3b82f6',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
  },
  loading: {
    background: '#374151',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
  },
} as const;

// Default toast configuration
const DEFAULT_CONFIG = {
  position: 'top-right' as const,
  duration: {
    success: 4000,
    error: 5000,
    info: 4000,
  },
} as const;

class ToastService {
  public success(message: string, options?: ToastOptions): void {
    toast.success(message, {
      duration: options?.duration ?? DEFAULT_CONFIG.duration.success,
      position: options?.position ?? DEFAULT_CONFIG.position,
      style: TOAST_STYLES.success,
    });
  }

  public error(message: string, options?: ToastOptions): void {
    toast.error(message, {
      duration: options?.duration ?? DEFAULT_CONFIG.duration.error,
      position: options?.position ?? DEFAULT_CONFIG.position,
      style: TOAST_STYLES.error,
    });
  }

  public info(message: string, options?: ToastOptions): void {
    toast(message, {
      duration: options?.duration ?? DEFAULT_CONFIG.duration.info,
      position: options?.position ?? DEFAULT_CONFIG.position,
      icon: 'ℹ️',
      style: TOAST_STYLES.info,
    });
  }

  public loading(message: string): string {
    return toast.loading(message, {
      position: DEFAULT_CONFIG.position,
      style: TOAST_STYLES.loading,
    });
  }

  public dismiss(toastId?: string): void {
    toast.dismiss(toastId);
  }

  public dismissAll(): void {
    toast.dismiss();
  }

  public promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ): Promise<T> {
    return toast.promise(promise, messages, {
      position: DEFAULT_CONFIG.position,
      success: {
        style: TOAST_STYLES.success,
      },
      error: {
        style: TOAST_STYLES.error,
      },
      loading: {
        style: TOAST_STYLES.loading,
      },
    });
  }
}

export const toastService = new ToastService();
export default toastService;
