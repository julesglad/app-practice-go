import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { formatDate } from '@angular/common';

export interface Skill {}

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css'],
})
export class NewSessionComponent implements OnInit {
  instruments = ['Clarinet', 'Flute', 'Saxophone'];
  logForm: any;
  addOnBlur = true;
  selectedValue;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: Skill[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skills.push(value);
    }
    event.chipInput!.clear();
    console.log(this.skills);

    // this.logForm.skillsForm.push(value)

    this.logForm.patchValue({ skills: this.skills });
  }

  remove(skill: Skill): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
    console.log(this.skills);
  }

  constructor(
    private fb: FormBuilder,
    public crudApi: CrudService,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit(): void {
    this.logForm = this.fb.group({
      sessionDate: ['', Validators.required],
      startTime: ['', Validators.required],
      totalHours: ['', Validators.required],
      totalMinutes: ['', Validators.required],
      instruments: '',
      skills: [],
      notes: '',
      recording: '',
    });
  }

  newLog() {
    if (this.logForm.invalid) {
      console.log('nope');
    }


      this.logForm.patchValue({
        sessionDate: formatDate(
          this.logForm.value.sessionDate,
          'MM-dd-yyyy',
          this.locale
        ),
      });
      this.crudApi.newLog(this.logForm.value);
      setTimeout(
        () => (console.log(this.logForm.value), this.logForm.reset(),
        this.logForm.markAsPristine()),
        10
      );
    }
  
}
