import { InjectionToken } from '@angular/core';
import { GlobalToastConfig } from '../models/Toast';

export const DEFAULT_TOAST_CONFIG: GlobalToastConfig = {
  width: '350px',
  position: 'center',
  headerColor: '#000',
  iconColor: '#5F95E1',
  contentColor: '#777777',
};

export const USER_TOAST_CONFIG = new InjectionToken<GlobalToastConfig>('User Toast Config');
