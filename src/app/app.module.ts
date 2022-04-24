import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CvTemplateComponent } from './components/cv-template/cv-template.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { LiveEditInputComponent } from './modules/live-edit-input/live-edit-input.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserService } from './service/user-service/user.service';
import { AvatarComponent } from './components/avatar/avatar.component';
import { LanguageListComponent } from './components/language-list/language-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { SkillsComponent } from './components/skills/skills.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EducationComponent } from './components/education/education.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { LoginComponent } from './pages/login/login.component';
import { CvContainerComponent } from './pages/cv-container/cv-container.component';
import { HoverClassDirective } from './directive/hover/hover-class.directive';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { LinebreaksPipe } from './pipes/line-breaks/linebreaks.pipe';
import { LiveEditTextareaComponent } from './modules/live-edit-textarea/live-edit-textarea.component';
import { SecurityRestrictedComponent } from './modules/security-restricted/security-restricted.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ShareProfileComponent } from './pages/share-profile/share-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CvTemplateComponent,
    ExperienceComponent,
    LiveEditInputComponent,
    LiveEditTextareaComponent,
    PersonalInfoComponent,
    ProfileComponent,
    AvatarComponent,
    LanguageListComponent,
    SafeHtmlPipe,
    SkillsComponent,
    HoverClassDirective,
    LinebreaksPipe,
    EducationComponent,
    CertificatesComponent,
    LoginComponent,
    CvContainerComponent,
    SecurityRestrictedComponent,
    ShareProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    UserService,
    MatDatepickerModule,
    CookieService,
    ClipboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
