import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { LogListComponent } from './log-list/log-list.component';
import { NewSessionComponent } from './new-session/new-session.component';
import { AuthGuard } from './services/guard.guard.spec';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {path: 'new-session', component: NewSessionComponent, canActivate: [AuthGuard] },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'sign-in', component: LogInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent},
  {path: 'log-list', component: LogListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
