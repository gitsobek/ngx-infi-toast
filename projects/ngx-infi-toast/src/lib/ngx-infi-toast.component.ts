import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-infi-toast',
  template: `
    <p>
      ngx-infi-toast works!
    </p>
  `,
  styleUrls: ['./ngx-infi-toast.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NgxInfiToastComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
