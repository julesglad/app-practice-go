import { Time } from "@angular/common";

export interface Log {
    $key: String,
    sessionDate: Date,
    startTime: Time,
    totalHours: Number,
    totalMinutes: Number,
    instruments: Array<any>,
    skills: Array<any>,
    notes: String
}