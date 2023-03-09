import { G } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Goal } from './goal';
import { Instruments } from './instruments';
import { Log } from './log';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  logsRef: AngularFireList<any>;
  logRef: AngularFireObject<any>;
  instrumentsRef: AngularFireList<any>;
  instrumentRef: AngularFireObject<any>;
  goalsRef: AngularFireList<any>;
  goalRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase, private _db: AngularFirestore) {
    this.GetLogsList();
    this.GetInstrumentList();
    this.GetGoalList();
  }

  //Create Log
  newLog(log: Log) {
    this.logsRef.push({
      sessionDate: log.sessionDate,
      startTime: log.startTime,
      totalHours: log.totalHours,
      totalMinutes: log.totalMinutes,
      instruments: log.instruments,
      skills: log.skills,
      notes: log.notes,
    });
  }
  // Fetch Single Log Object
  getLog(id: string) {
    this.logRef = this.db.object('logs-list/' + id);
    return this.logsRef;
  }

  // Fetch Logs List
  GetLogsList() {
    this.logsRef = this.db.list('logs-list');
    return this.logsRef;
  }

  // Update Log Object
  UpdateLog(log: Log) {
    this.logRef.update({
      sessionDate: log.sessionDate,
      //startTime: log.startTime,
      totalHours: log.totalHours,
      totalMinutes: log.totalMinutes,
      instruments: log.instruments,
      skills: log.skills,
      notes: log.notes,
    });
  }

  // Delete Log Object
  DeleteLog(id: string) {
    this.logRef = this.db.object('logs-list/' + id);
    this.logRef.remove();
  }

  //INSTRUMENT LIST
  newInstrument(i: Instruments) {
    this.instrumentsRef.push({
      instrumentName: i.instrumentName,
    });
  }

  GetInstrumentList() {
    this.instrumentsRef = this.db.list('instruments-list');
    return this.instrumentsRef;
  }

  DeleteInstrument(id: string) {
    this.instrumentRef = this.db.object('instruments-list/' + id);
    this.instrumentRef.remove();
  }

  //GOALS
  newGoal(g: Goal) {
    this.goalsRef.push({
      goalText: g.goalText,
      completed: false,
    });
  }

  GetGoalList() {
    this.goalsRef = this.db.list('goals-list');
    return this.goalsRef;
  }

  deleteGoal(id: string) {
    this.goalRef = this.db.object('goals-list/' + id);
    this.goalRef.remove();
  }

  UpdateGoal(g: Goal, id: String) {
    this.db.database.ref(`goals-list/${id}`).update({ completed: g.completed });
  }
}
