<p align="center">
 <img width="80%" height="80%" src="https://raw.githubusercontent.com/gitsobek/ngx-infi-toast/master/logo.svg?sanitize=true">
</p>
&nbsp;

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Neat, fully customizable and lightweight notifications for your application.<br><br>

<p align="center">
 <img src="https://raw.githubusercontent.com/gitsobek/ngx-infi-toast/master/presentation.gif">
</p>

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Demo](#demo)
- [Future plans](#plans)
- [Contribution](#contribution)

## Installation

Using npm:

`npm install ngx-infi-toast --save`

## Configuration
In order to display your first toast, you have to import NgxInfiToast module in the root module:

```ts
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxInfiToastModule } from 'ngx-infi-toast';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // ...,
    NgxInfiToastModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Inject NgxInfiToastService into your component and display a toast notification with a specified message:
```ts
import { NgxInfiToastService } from 'ngx-infi-toast';
 
export class PaymentComponent implements OnInit {
  constructor(private toastService: NgxInfiToastService) {}
 
  ngOnInit() {}

  onPaymentReceived(): void {
      this.toastService.open('Payment has been succesfully processed!');
      // ..
  }
}
```

### Provide custom configuration
You can pass your own custom configuration object as a second parameter of the function. Available properties are following: 

| Name            | Type                       | Description                                                         |
|:----------------|:---------------------------|:--------------------------------------------------------------------|
| width           | string                     | width of displayed notification (default: 350px)                    |
| contentColor    | string                     | color of content text (default: #777777)                            |
| iconColor       | string                     | color of close icon (default: #5F95E1)                              |
| headerText      | string                     | top header text                                                     |
| headerColor     | string                     | color of header text (default: #000)                                |
| data            | any                        | data to be emitted in onClose observable after closing notification |

### Handlers
At this moment, function `open` returns a handler object which will be helpful to use for listening on specific actions related to a single notification.

* `onClose()` - emits passed data in the configuration object on notification closure, if no data is passed to the configuration object, it will emit ```true``` by default, this can be generally used to keep track of the data associated with a specific notification.<br>
Example: 
```ts
const toast = this.toastService.open(
    'Payment has been succesfully processed!',
    {
        width: '500px',
        headerText: 'Payment received',
        data: {
            id: 1,
            type: 'payment',
            status: 'success'
        }
    }
);

toast.onClose().subscribe(data => {
    // data is equal to:
    // {
    //    id: 1,
    //    type: 'payment',
    //    status: 'success'
    // }
    // do something here...
});
```

### Global configuration
You can provide a global configuration which will be applied for all notifications in your application. All available properties are listed below.

| Name            | Type                        | Description                                                         |
|:----------------|:----------------------------|:--------------------------------------------------------------------|
| width           | string                      | width of displayed notification (default: 350px)                    |
| position        | 'left', 'center', 'right'   | notification alignment (default: center)                            |
| contentColor    | string                      | color of content text (default: #777777)                            |
| iconColor       | string                      | color of close icon (default: #5F95E1)                              |
| headerColor     | string                      | color of header text (default: #000)                                |

Example: 
```ts
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxInfiToastModule } from 'ngx-infi-toast';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // ...,
    NgxInfiToastModule.forRoot({
        width: '500px',
        position: 'left',
        contentColor: '#000',
        iconColor: '#000',
        headerColor: 'red'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

**Important:** global and component level configuration are merged together, therefore component level values will override global ones in case there is a common property that is included in both configuration objects.

## Demo
The showcase of the library can be found under the following [link](https://gitsobek.github.io/ngx-infi-toast/).

## Future plans
- possibility to stack toasts or show them one by one
- display provided template or component in the toast

## Contribution
This project follows the [all-contributors](https://allcontributors.org/docs/en/emoji-key) specification. Contributions of any kind are welcome!