import {
  Injectable,
  ComponentRef,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Optional,
  Inject,
} from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { NgxInfiToastComponent } from './ngx-infi-toast.component';
import { ToastConfig, ToastHandler, ToastBundle, GlobalToastConfig } from './_core/models/Toast';
import { AbstractCentralToast } from './_core/abstracts/toast.abstract';
import { USER_TOAST_CONFIG, DEFAULT_TOAST_CONFIG } from './_core/configs';

@Injectable({
  providedIn: 'root',
})
export class NgxInfiToastService extends AbstractCentralToast {
  private mapOfSources: Map<number, Subject<any>> = new Map<number, Subject<any>>();
  private toastComponentRef: ComponentRef<NgxInfiToastComponent> | null;
  private onCloseSub: Subscription;
  private globalConfig: GlobalToastConfig | null;

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private compFactoryResolver: ComponentFactoryResolver,
    @Optional() @Inject(USER_TOAST_CONFIG) toastConfig: GlobalToastConfig
  ) {
    super();

    this.toastComponentRef = null;
    this.globalConfig = toastConfig || null;
    this.onCloseSub = new Subscription();
  }

  /**
   * Shows toast with specified content
   * @param config Configuration options for the toast
   * @returns Handlers and notification sources
   */
  open(content: string, config?: Partial<ToastConfig>): Readonly<ToastHandler> {
    const key = this.mapOfSources.size ? ++Array.from(this.mapOfSources)[this.mapOfSources.size - 1][0] : 0;
    const mergedConfig = this.mergeConfigs(config, this.globalConfig);

    const bundle = {
      content,
      mapKey: key,
      ...mergedConfig,
    } as ToastBundle;

    this.activeToasts ? this.appendElementToView(bundle) : this.appendViewToBody(bundle);

    this.mapOfSources.set(key, new Subject());

    const apiHandler = {
      onClose: () =>
        new Observable((observer) => {
          const subscription = this.mapOfSources.get(key)?.subscribe(
            (data: any) => {
              observer.next(data);
              observer.complete();
              this.mapOfSources.delete(key);
            },
            (err) => observer.error(err)
          );

          return () => subscription?.unsubscribe();
        }) as Observable<any>,
    };

    return Object.freeze(apiHandler);
  }

  private appendViewToBody(payload: ToastBundle): void {
    const compFactory = this.compFactoryResolver.resolveComponentFactory(NgxInfiToastComponent);
    const compRef = compFactory.create(this.injector);

    compRef.instance.config = payload;
    compRef.hostView.detectChanges();

    this.appRef.attachView(compRef.hostView);

    const domEl = (compRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domEl);

    this.toastComponentRef = compRef;
    this.activeToasts++;

    this.onCloseSub = this.toastComponentRef.instance.onClose.subscribe((toast: ToastBundle) => {
      this.activeToasts--;

      const toEmit = toast && toast.data ? toast.data : true;
      this.mapOfSources.get(toast.mapKey)?.next(toEmit);

      if (!this.activeToasts) {
        this.removeViewFromBody();
        this.mapOfSources.clear();
        this.onCloseSub && this.onCloseSub.unsubscribe();
      }
    });
  }

  private removeViewFromBody(): void {
    if (this.toastComponentRef) {
      this.appRef.detachView(this.toastComponentRef.hostView);
      this.toastComponentRef.destroy();
      this.toastComponentRef = null;
    }
  }

  private appendElementToView(payload: ToastBundle): void {
    if (this.toastComponentRef) {
      this.toastComponentRef.instance.pushDownElements();
      this.toastComponentRef.instance.addNewElement(payload);
      this.toastComponentRef.hostView.detectChanges();

      this.activeToasts++;
    }
  }

  private mergeConfigs(
    localConfig: Partial<ToastConfig> | undefined,
    globalConfig: GlobalToastConfig | null
  ): ToastConfig | {} {
    return {
      ...DEFAULT_TOAST_CONFIG,
      ...(globalConfig && { ...globalConfig }),
      ...(localConfig && { ...localConfig }),
    };
  }
}
