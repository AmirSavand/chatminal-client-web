import { Component, Input } from '@angular/core';
import { BootstrapColor } from '@modules/micro/types/bootstrap-color';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  @Input() label?: string;
  @Input() value: string;
  @Input() labelBg: BootstrapColor = 'dark';
  @Input() valueBg: BootstrapColor = 'light';
}
