import { ToastConfig, ToastHandler } from '../models/Toast';

export abstract class AbstractCentralToast {
  protected activeToasts = 0;

  abstract open(content: string, config?: Partial<ToastConfig>): Readonly<ToastHandler>;
}
