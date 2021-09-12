import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCircleNotch } from '@fortawesome/pro-duotone-svg-icons/faCircleNotch';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  readonly icon: IconDefinition = faCircleNotch;
}
