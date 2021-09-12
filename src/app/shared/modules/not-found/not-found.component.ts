import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDizzy } from '@fortawesome/pro-duotone-svg-icons/faDizzy';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {

  readonly faDizzy: IconDefinition = faDizzy;

  @Input() name: string;

  @Input() classes = '';
}
