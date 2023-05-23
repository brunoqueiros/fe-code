import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { JSONObject } from '../types/shared.types';
import humanizeErrors from '../humanize-errors/humanize-errors';

@Component({
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent {
  @Input() formCtrl: any;
  @Input() label = '';
  @Input() type = 'text';
  @Input() testid = '';

  humanizeErrors(errors: JSONObject | null): string[] {
    return errors ? humanizeErrors(errors) : [];
  };
}
