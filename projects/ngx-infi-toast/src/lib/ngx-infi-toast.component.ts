import { Component, Input, ElementRef, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { ToastBundle } from './_core/models/Toast';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-infi-toast',
  templateUrl: './ngx-infi-toast.component.html',
  styleUrls: ['./ngx-infi-toast.component.scss'],
})
export class NgxInfiToastComponent implements AfterViewInit {
  public toastQueue: ToastBundle[] = [];

  private readonly _onClose = new Subject<ToastBundle>();
  public onClose = this._onClose.asObservable();

  private readonly breakpointWidth = 520;

  @Input() set config(value: ToastBundle) {
    this.toastQueue.push(value);
  }

  constructor(private host: ElementRef) {}

  ngAfterViewInit(): void {
    this.adjustElementsSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustElementsSize();
  }

  get container(): HTMLElement[] {
    return this.host.nativeElement.querySelectorAll('.container') as HTMLElement[];
  }

  close(idx: number): void {
    this.container[idx].style.top = idx * 160 + 'px';
    this.container[idx].style.animation = 'toastOut 0.3s';
  }

  addNewElement(value: ToastBundle): void {
    this.toastQueue.unshift(value);
  }

  pushDownElements(): void {
    this.animateElements(0, 'toastMoveDown');
  }

  onAnimationDone(event: AnimationEvent, idx: number, closedToast: ToastBundle): void {
    if (event.animationName === 'toastOut') {
      if (idx >= 0) {
        this.toastQueue.splice(idx, 1);

        const containerSize = this.container.length;

        if (containerSize > 1 && containerSize - 1 >= idx) {
          this.animateElements(idx, 'toastMoveUp');
        }

        this._onClose.next(closedToast);
      }
    }
  }

  private animateElements(startIdx: number = 0, animationName: 'toastMoveUp' | 'toastMoveDown') {
    for (let i = startIdx, { length } = this.container; i < length; i++) {
      if (this.container[i].style.animation) {
        this.container[i].style.animation = 'none';
        /* Force reflow to restart animation */
        this.container[i].getClientRects();
      }

      this.container[i].style.top = i * 160 + 'px';
      this.container[i].style.animation = `0.3s ease 0s 1 normal forwards running ${animationName}`;
    }
  }

  private adjustElementsSize(): void {
    const isSmall = window.innerWidth && window.innerWidth <= this.breakpointWidth;

    for (let i = 0, { length } = this.container; i < length; i++) {
      this.container[i].style.width = isSmall
        ? `${window.innerWidth - 20}px`
        : this.toastQueue[i].width
        ? this.toastQueue[i].width
        : '350px';
    }
  }
}
