import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxInfiToastComponent } from './ngx-infi-toast.component';
import { CommonModule } from '@angular/common';
import { AbstractCentralToast } from './_core/abstracts/toast.abstract';
import { NgxInfiToastService } from './ngx-infi-toast.service';
import { GlobalToastConfig } from './_core/models/Toast';
import { USER_TOAST_CONFIG } from './_core/configs';

@NgModule({
  declarations: [NgxInfiToastComponent],
  imports: [CommonModule],
  providers: [
    {
      provide: AbstractCentralToast,
      useClass: NgxInfiToastService,
    },
  ],
  exports: [NgxInfiToastComponent],
})
export class NgxInfiToastModule {
  static forRoot(config: Partial<GlobalToastConfig>): ModuleWithProviders<NgxInfiToastModule> {
    return {
      ngModule: NgxInfiToastModule,
      providers: [
        {
          provide: USER_TOAST_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
