import { Component, OnInit, LOCALE_ID, Inject, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Instruments } from '../services/instruments';


export interface Skill {}

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css'],
})
export class NewSessionComponent implements OnInit {
  instruments: Instruments[]
  logForm: any;
  addOnBlur = true;
  selectedValue;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: Skill[] = [];
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skills.push(value);
    }
    event.chipInput!.clear();
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
    @Inject(LOCALE_ID) public locale: string,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getInstruments()

    this.logForm = this.fb.group({
      sessionDate: ['', Validators.required],
      totalHours: ['', Validators.required],
      totalMinutes: ['', Validators.required],
      instruments: [this.instruments, Validators.required],
      skills: [],
      notes: '',
      recording: '',
    });

 
  }

  getInstruments() {
    let l = this.crudApi.GetInstrumentList()
    l.snapshotChanges().subscribe(data => {
      console.log(data),
      this.instruments = [],
      data.forEach((item) => {
        let a = item.payload.toJSON();
     //   a['$key'] = item.key;
        this.instruments.push(a as Instruments);
        console.log(a) 
      })})
  }

  newLog() {
    if (this.logForm.invalid) {
      this.openSnackBar('Please fill out all of the required form fields.')
    } else {
      this.logForm.patchValue({
        sessionDate: formatDate(
          this.logForm.value.sessionDate,
          'MM-dd-yyyy',
          this.locale
        ),
      });
      this.crudApi.newLog(this.logForm.value);
      setTimeout(
        () => (
          console.log(this.logForm.value),
          (this.skills = []),
          this.logForm.reset(),
          this.logForm.markAsPristine(),
          this.logForm.markAsUntouched(),
          this.formGroupDirective.resetForm()
        ),
        10
      );
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {duration: 3000});
  }
}
