import { Component } from '@angular/core';
import { ToastHandler } from 'projects/ngx-infi-toast/src/lib/_core/models/Toast';
import { NgxInfiToastService } from 'projects/ngx-infi-toast/src/public-api';

const CONTENT_EXAMPLES = [
  {
    content:
      'Your payment has been succesfully processed by our platform. You can use your credits to buy our products or continue browsing our offers.',
    config: {
      data: {
        id: 0,
        status: 'success',
        description: 'Payment successfully processed.',
      },
    },
  },
  {
    content: 'Congratulations! You have won a pair of bam bam sticks. Please do not click this, it is a scam.',
    config: {
      headerText: 'Advertisment',
    },
  },
  {
    content:
      'Hello user, we are happy to inform you that we have resolved the issue you have pointed out. You are good to go!',
    config: {
      headerText: 'Alert',
      footerText: 'BiccBank Dev Team',
      data: {
        id: 2,
        type: 'ticket',
        status: 'resolved',
      },
    },
  },
  {
    content:
      'A new update for Chrome is available and will be applied as soon as you relaunch. Please do not do it, because this is a fake alert. Do you like this alert, though?',
  },
  {
    content: 'Also open up your console to check emitted data after toast close.',
    config: {
      headerText: 'Showcase information',
      data: "See, it's working nicely.",
    },
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private toastService: NgxInfiToastService) {}

  show(): void {
    const idx = Math.floor(Math.random() * CONTENT_EXAMPLES.length);
    const contentObj = CONTENT_EXAMPLES[idx];

    const { content, config } = contentObj;
    let toast: ToastHandler | null = null;

    toast = contentObj.config ? this.toastService.open(content, config) : this.toastService.open(content);

    toast.onClose().subscribe(console.log);
  }
}
