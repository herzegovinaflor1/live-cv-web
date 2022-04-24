import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvContainerComponent } from './pages/cv-container/cv-container.component';
import { LoginComponent } from './pages/login/login.component';
import { ShareProfileComponent } from './pages/share-profile/share-profile.component';

 
export const routes: Routes = [
  { 
    path: 'cv/:user_id', 
    component: CvContainerComponent,
    canActivate: []
  },
  { 
    path: 'share', 
    component: ShareProfileComponent,
    canActivate: []
  },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
