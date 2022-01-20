import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormData, Utils } from '@amirsavand/ngx-common';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from '@app/shared/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {

  readonly faBack: IconDefinition = faArrowLeft;

  isLoggedIn = Boolean(AccountService.token);

  form: ReactiveFormData = {
    error: {},
    form: this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    }),
  };

  syncLoading = false;

  syncSuccess = false;

  syncError?: string;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService) {
  }

  submit(login: boolean): void {
    if (!Utils.validateForms([this.form])) {
      return;
    }
    this.form.loading = true;
    let method: 'login' | 'register' = 'register';
    if (login) {
      method = 'login';
    }
    this.accountService[method](Object.assign(this.form.form.value)).subscribe({
      next: (): void => {
        this.form.success = true;
        this.form.form.disable();
      },
      error: (error: HttpErrorResponse): void => {
        Utils.handleError(this.form, error);
      },
    });
  }

  sync(pull: boolean): void {
    delete this.syncError;
    this.syncLoading = true;
    this.syncSuccess = false;
    let method: 'fetch' | 'update' = 'update';
    if (pull) {
      method = 'fetch';
    }
    this.accountService[method]().subscribe({
      next: (): void => {
        this.syncLoading = false;
        this.syncSuccess = true;
      },
      error: (error: HttpErrorResponse): void => {
        this.syncLoading = false;
        this.syncError = error.error?.detail || 'Failed to sync data.';
      },
    });
  }

  unlink(): void {
    AccountService.clear();
    this.isLoggedIn = false;
  }
}
