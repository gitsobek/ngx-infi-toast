import { InjectionToken } from '@angular/core';
import { GlobalToastConfig } from '../models/Toast';

export const USER_TOAST_CONFIG = new InjectionToken<GlobalToastConfig>('User Toast Config');
