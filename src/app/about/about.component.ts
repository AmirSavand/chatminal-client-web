import { Component } from '@angular/core';
import { VERSION } from '@app/shared/consts/version';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {

  readonly name = 'about';

  readonly version = VERSION;
  readonly issues = 'https://github.com/AmirSavand/chatminal-client-web/issues';
  readonly now: Date = new Date();
  readonly savandbros = 'https://savandbros.com';
}
