import { Observable } from 'rxjs';

export type ToastPosition = 'left' | 'center' | 'right';

export interface GlobalToastConfig {
  width: string;
  position: ToastPosition;
  contentColor: string;
  iconColor: string;
  headerColor: string;
}

export type ToastConfig = Omit<GlobalToastConfig, 'position'> & {
  headerText: string;
  data: any;
};

export type ToastBundle = ToastConfig &
  Pick<GlobalToastConfig, 'position'> & {
    content: string;
    mapKey: number;
  };

export interface ToastHandler {
  onClose: () => Observable<any>;
}
