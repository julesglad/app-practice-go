import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  view = 'newSession'
  newSessionText = 'Log your practice by keeping track of the date, minutes, skills, pieces, and more! No more losing paper logs!'
  logText = 'View all of your practice sessions in one easy locations. Easily analyze your habits so you can effectively build your skills.'
  metronomeText = 'The most effective practice a musician can have almost always involves a metronome. Use the built in metronome feature for easy access to keep your practice steady and consistent.'
  goalsText = 'Set goals to aspire to. Watch as you check them off one-by-one and feel the satisfaction of a job well done.'

  constructor() { }

  ngOnInit(): void {
  }

  changeView(viewName) {
    this.view = viewName
  }

  

}
