import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from '../new-session/new-session.component';
import { CrudService } from '../services/crud.service';
import { Log } from '../services/log';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css'],
})
export class LogListComponent implements OnInit {
  logList: Log[];
  displayedColumns: string[] = [
    'sessionDate',
    'totalHours',
    'totalMinutes',
    'instruments',
    'skills',
    'notes',
    'delete',
  ];
  instruments;
  skills;
  skill;
  inst;
  constructor(private crudApi: CrudService, public dialog: MatDialog) {}

  ngOnInit(): void {
    // this.crudApi.GetLogsList()
    this.getLogs();
  }

  //This gets the data from the backend and displays it
  getLogs() {
    let s = this.crudApi.GetLogsList();
    s.snapshotChanges().subscribe((data) => {
      console.log(data, 'this is the base data');
      this.logList = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.logList.push(a as Log);
        console.log(a);
      });

      this.logList.forEach((log) => {
        log.skills = Object.values(log.skills);
        log.instruments = Object.values(log.instruments);
      });

      console.log(this.logList);
    });
  }

  delete(log) {
    this.crudApi.DeleteLog(log.$key);
  }

  edit(log) {
    
    const dialogRef =this.dialog.open(EditLogDialog, {
      data: {
        log,
      },
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.myForm.setControl('animal', result);
    });

  }
}

// EDIT LOG FUNCTIONS

@Component({
  selector: 'edit-log-dialog',
  templateUrl: 'edit-log-dialog.html',
})
export class EditLogDialog {
  instruments = ['Clarinet', 'Flute', 'Saxophone'];
  editForm: any;
  addOnBlur = true;
  selectedValue;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: Skill[] = [];

  constructor(
    private fb: FormBuilder,
    public crudApi: CrudService,
    @Inject(LOCALE_ID) public locale: string,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data)

    this.skills = this.data.log.skills
    this.selectedValue = this.data.log.instruments
    const date = new Date(this.data.log.sessionDate)
    console.log(date)
    this.editForm = this.fb.group({
      $key: this.data.log.$key,
      sessionDate: [date, Validators.required],
      startTime: [this.data.log.startTime, Validators.required],
      totalHours: [this.data.log.totalHours, Validators.required],
      totalMinutes: [this.data.log.totalMinutes, Validators.required],
      instruments: '',
      skills: [],
      notes: this.data.log.notes,
     // recording: '',
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skills.push(value);
    }
    event.chipInput!.clear();
    console.log(this.skills);

    // this.logForm.skillsForm.push(value)

    this.editForm.patchValue({ skills: this.skills });
  }

  remove(skill: Skill): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
    console.log(this.skills);
  }


  //future feature
  // saveLog() {
  //   if (this.editForm.invalid) {
  //   }
  //   this.editForm.patchValue({
  //     sessionDate: formatDate(
  //       this.editForm.value.sessionDate,
  //       'MM-dd-yyyy',
  //       this.locale
  //     ),
  //   });
  //   console.log(this.editForm.value)
  //   this.crudApi.UpdateLog(this.editForm.value);
  //   setTimeout(
  //     () => (
  //       console.log(this.editForm.value),
  //       this.editForm.reset(),
  //       this.editForm.markAsPristine()
  //     ),
  //     10
  //   );
  // }
}
