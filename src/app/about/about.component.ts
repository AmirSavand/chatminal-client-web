import { Component } from '@angular/core';
import { VERSION } from '@app/shared/consts/version';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {

  version = VERSION;
}
