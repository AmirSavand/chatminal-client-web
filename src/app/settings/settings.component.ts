import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '@app/shared/classes/user';
import { ReactiveFormData } from '@app/shared/interfaces/reactive-form-data';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

  form: ReactiveFormData = {
    error: {},
    form: this.formBuilder.group({
      username: [User.username, Validators.required],
    }),
  }

  constructor(private formBuilder: FormBuilder) {
  }

  submit(): void {
    if (!this.form.form.invalid) {
      this.form.form.patchValue({
        username: this.form.form.value.username.trim().substr(0, 20).replace(/\W/g, ''),
      });
      User.username = this.form.form.value.username;
      User.save();
      this.form.error = {};
      this.form.success = true;
    } else {
      this.form.error = { detail: 'Display name is required.' };
      this.form.success = false;
    }
  }
}
