import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from '../form-field/form-field.component';

describe('FormFieldComponent', () => {
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
  });

  it('should set call humanizeErrors', () => {
    const component = fixture.componentInstance;
    expect(component.humanizeErrors(null)).toEqual([]);
    expect(component.humanizeErrors({
      required: 'true'
    })).toEqual(['This field is required']);
  });
});
