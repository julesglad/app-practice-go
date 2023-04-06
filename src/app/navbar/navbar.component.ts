import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { distinctUntilChanged, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  displayMetronome;
  mobileView;
  Breakpoints = Breakpoints;
  currentBreakpoint:string = '';
  userId
  
  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );
    

  constructor(public authService: AuthService, private router: Router, private breakpointObserver: BreakpointObserver, private crudApi: CrudService) {
    this.crudApi.loadCurrent.subscribe((x) => {
      this.userId = x
    })
   }

  ngOnInit(): void {
    this.breakpoint$.subscribe(() =>
    this.breakpointChanged()
  );
  }


  changeDisplayMetronome(){
    this.displayMetronome = !this.displayMetronome
  
  }

  private breakpointChanged() {
    if(this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.currentBreakpoint = Breakpoints.Large;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.currentBreakpoint = Breakpoints.Medium;
    } 
  }

}
