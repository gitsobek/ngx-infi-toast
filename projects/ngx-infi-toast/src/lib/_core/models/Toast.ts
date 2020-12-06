import { Observable } from 'rxjs';

export interface GlobalToastConfig {
  width: string;
  contentColor: string;
  iconColor: string;
  headerColor: string;
}

export interface ToastConfig extends GlobalToastConfig {
  headerText: string;
  data: any;
}

export interface ToastBundle extends ToastConfig {
  content: string;
  mapKey: number;
}

export interface ToastHandler {
  onClose: () => Observable<any>;
}
