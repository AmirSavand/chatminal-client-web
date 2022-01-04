import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from '@app/shared/classes/room';
import { ReactiveFormData } from '@app/shared/interfaces/reactive-form-data';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  readonly faBack: IconDefinition = faArrowLeft;

  readonly form: ReactiveFormData = {
    error: {},
    form: this.formBuilder.group({
      id: ['', Validators.required],
    }),
  };

  constructor(private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.generate();
  }

  submit(): void {
    if (Room.isValidId(this.form.form.value.id)) {
      const room = new Room(this.form.form.value);
      Room.save();
      this.router.navigate(['/', room.id]);
    } else {
      this.form.error = {
        non_field_errors: [
          'I don\'t like this room ID. Choose another!',
          'ID must be between 3 to 64 characters.',
        ],
      };
    }
  }

  generate(): void {
    this.form.form.patchValue({ id: Room.generateId() });
  }
}
