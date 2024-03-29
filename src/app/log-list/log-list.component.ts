import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { formatDate } from '@angular/common';
import { AfterViewInit, Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from '../new-session/new-session.component';
import { CrudService } from '../services/crud.service';
import { Log } from '../services/log';
import {MatSort, Sort} from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css'],
})
export class LogListComponent implements AfterViewInit, OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  logList:  Log[];
  dataSource: MatTableDataSource<Log>
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
  sortedData: any;
  length;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent;

  constructor(private crudApi: CrudService, public dialog: MatDialog) {
    this.getLogs()
  }

  ngOnInit(): void {
    //this.getLogs();
  }
  
  ngAfterViewInit() {
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
          this.dataSource = new MatTableDataSource<Log>(this.logList)
          this.dataSource.paginator = this.paginator;


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
//Table functionality

sortData(sort: Sort) {
  const data = this.logList.slice();
  if (!sort.active || sort.direction === '') {
    this.logList = data;
    return;
  }

  this.logList = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'sessionDate':
        return compare(a.sessionDate, b.sessionDate, isAsc);
    
      default:
        return 0;
    }
  });
}





}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
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
