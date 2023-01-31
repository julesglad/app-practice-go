import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewSessionComponent } from './new-session/new-session.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { LogInComponent } from './log-in/log-in.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CrudService } from './services/crud.service';
import { EditLogDialog, LogListComponent } from './log-list/log-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewSessionComponent,
    NavbarComponent,
    LogInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    LogListComponent,
  EditLogDialog,
  ToolbarComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [AuthService, CrudService],
  bootstrap: [AppComponent],
})
export class AppModule {}
