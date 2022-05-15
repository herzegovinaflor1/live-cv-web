import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvContainerComponent } from './pages/cv-container/cv-container.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShareProfileComponent } from './pages/share-profile/share-profile.component';


export const routes: Routes = [
  {
    path: 'cv/:user_id',
    component: CvContainerComponent
  },
  {
    path: 'share',
    component: ShareProfileComponent
  },
  { path: 'singup', component: RegisterComponent },
  { path: 'singin', component: LoginComponent },
  { path: '', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
