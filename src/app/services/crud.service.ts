import { Injectable, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Goal } from './goal';
import { Instruments } from './instruments';
import { Log } from './log';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
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
  userId: string;
  loadSource = new BehaviorSubject<any>('')
  loadCurrent = this.loadSource.asObservable();

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      if (user) this.userId = user.uid;
      console.log(user);
      console.log(this.userId);
      this.GetLogsList();
      this.GetInstrumentList();
      this.GetGoalList();
      this.changeLoad$(this.userId)
    });
  }

  changeLoad$(load$) {
    this.loadSource.next(load$)
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
    this.logRef = this.db.object('logs-list/' + this.userId + '/' + id);
    return this.logsRef;
  }

  // Fetch Logs List
  GetLogsList() {
    if (!this.userId) return;
    this.logsRef = this.db.list('logs-list/' + this.userId);
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
    this.logRef = this.db.object('logs-list/' + this.userId + '/' + id);
    this.logRef.remove();
  }

  //INSTRUMENT LIST
  newInstrument(i: Instruments) {
    this.instrumentsRef.push({
      instrumentName: i.instrumentName,
    });
  }

  GetInstrumentList() {
    if (!this.userId) return;
    this.instrumentsRef = this.db.list('instruments-list/' + this.userId);
    return this.instrumentsRef;
  }

  DeleteInstrument(id: string) {
    this.instrumentRef = this.db.object(
      'instruments-list/' + this.userId + '/' + id
    );
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
    if (!this.userId) return;
    this.goalsRef = this.db.list('goals-list/' + this.userId);
    return this.goalsRef;
  }

  deleteGoal(id: string) {
    if (!this.userId) return;
    this.goalRef = this.db.object('goals-list/' + this.userId + '/' + id);
    this.goalRef.remove();
  }

  UpdateGoal(g: Goal, id: String) {
    this.db.database
      .ref('goals-list/' + this.userId + '/' + id)
      .update({ completed: g.completed });
  }
}
