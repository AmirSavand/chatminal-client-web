import { Component, Input } from '@angular/core';
import { AlertType } from '@modules/alert/shared/enums/alert-type.enum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {

  /**
   * Alert type (color)
   */
  @Input() type: AlertType = AlertType.INFO;

  /**
   * Alert title
   */
  @Input() title?: string;

  /**
   * Alert message
   */
  @Input() message?: string;
}
