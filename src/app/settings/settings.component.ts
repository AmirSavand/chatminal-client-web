import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder,
              private router: Router) {
  }

  submit(): void {
    if (!this.form.form.invalid) {
      User.username = this.form.form.value.username;
      User.save();
      this.router.navigateByUrl('/');
    }
  }
}
