import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatYearView } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '../services/crud.service';
import { Goal } from '../services/goal';
import { Instruments } from '../services/instruments';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  instrumentsArray = [];
  goalsList = []
  goalForm: FormGroup;

  constructor(
    private crudApi: CrudService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.goalForm = this.fb.group({
      goalText: '',
      completed: false,
    });
    this.getInstruments();
    this.getGoals();
  }

  getInstruments() {
    let i = this.crudApi.GetInstrumentList();
    i.snapshotChanges().subscribe((data) => {
      this.instrumentsArray = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.instrumentsArray.push(a as Instruments);
        console.log(a);
      });
    });
  }

  addInstrument() {
    const dialogRef = this.dialog.open(AddInstrumentDialog, {});
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getGoals() {
    let i = this.crudApi.GetGoalList();
    i.snapshotChanges().subscribe((data) => {
      this.goalsList = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.goalsList.push(a as Goal);
        console.log(a);
      });
    });
  }

  deleteGoal(goal) {
    this.crudApi.deleteGoal(goal.$key);
  }

  changeGoalCompletionTrue(goal) {
    goal.completed = true
    console.log(goal)
    this.crudApi.UpdateGoal(goal, goal.$key)
  }

  changeGoalCompletionFalse(goal) {
    goal.completed = false
    console.log(goal)
    this.crudApi.UpdateGoal(goal, goal.$key)
  }

  addGoal() {
    this.crudApi.newGoal(this.goalForm.value);
    this.goalForm.reset()
  }
}

@Component({
  selector: 'add-instrument-dialog',
  templateUrl: 'add-instrument-dialog.html',
})
export class AddInstrumentDialog implements OnInit {
  addInstrumentForm: FormGroup;
  instrumentList;
  constructor(private fb: FormBuilder, private crudApi: CrudService) {}

  ngOnInit() {
    this.addInstrumentForm = this.fb.group({
      instrumentName: '',
    });

    this.getInstruments();
  }

  addInstrument() {
    this.crudApi.newInstrument(this.addInstrumentForm.value);
    this.addInstrumentForm.reset();
  }

  getInstruments() {
    let i = this.crudApi.GetInstrumentList();
    i.snapshotChanges().subscribe((data) => {
      this.instrumentList = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.instrumentList.push(a as Instruments);
        console.log(a);
      });
    });
  }

  
  removeInstrument(inst) {
    this.crudApi.DeleteInstrument(inst.$key);
  }
}
