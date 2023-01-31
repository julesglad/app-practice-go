import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Log } from './log';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  logsRef: AngularFireList<any>;
  logRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {
    this.GetLogsList()
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
      notes: log.notes
    })

  }
  // Fetch Single Log Object
  getLog(id: string) {
    this.logRef = this.db.object('logs-list/' + id);
    return this.logsRef
  }

  // Fetch Logs List
  GetLogsList() {
    this.logsRef = this.db.list('logs-list');
    return this.logsRef
  }
 
  // Update Log Object
  UpdateLog(log: Log) {
    this.logsRef.push({
      sessionDate: log.sessionDate,
      startTime: log.startTime,
      totalHours: log.totalHours,
      totalMinutes: log.totalMinutes,
      instruments: log.instruments,
      skills: log.skills,
      notes: log.notes
    })
  }

  // Delete Log Object
  DeleteLog(id: string) {
    this.logRef = this.db.object('logs-list/' + id);
    this.logRef.remove();
  }
}