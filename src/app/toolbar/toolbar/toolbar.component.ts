import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  pause = false;
  bpm = 60;
  min = 40;
  max = 250;
  step = 1;

  constructor() {}

  ngOnInit(): void {
    let audio = new Audio();

    audio.src = '../assets/metronome-85688.mp3';
    audio.load();
    var player = new Tone.Player(
      '../assets/metronome-85688.mp3'
    ).toDestination();
    new Tone.Loop((time) => {
      player.start(time);
    }, '4n').start(0);
    Tone.Transport.bpm.value = 60;
    Tone.Transport.loopEnd = '1m';
    Tone.Transport.loop = true;
  }

  onInputChange(x) {
    console.log(x);
    this.bpm = x.value;
    if (this.pause = true) {
      Tone.Transport.bpm.rampTo(this.bpm, 1);
    }
  
  }

  playMetronome() {
    this.pause = true;
    Tone.Transport.start();
  }

  pauseMetronome() {
    this.pause = false;
    Tone.Transport.stop();
  }

   
}
