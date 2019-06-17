/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

// TODO ver que hace el secureinnerpagesguard
// Components
import { ProfileComponent } from './components/profile/profile.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

// Basic imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import canActivate guard services
import { AuthGuard } from './services/guard/auth.guard';
import { SecureInnerPagesGuard } from './services/guard/secure-inner-pages.guard';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: HomeComponent },
  
  { path: 'login', component: LoginComponent, /* canActivate: [SecureInnerPagesGuard] */},
  { path: 'logout/:sure', component: LoginComponent },
  { path: 'ajustes/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'perfil/:id', component: ProfileComponent },
  
  { path: 'crear-categoria', component: CategoryNewComponent, canActivate: [AuthGuard] },
  { path: 'categoria/:id', component: CategoryDetailComponent },
  
  { path: 'crear-entrada', component: PostNewComponent,canActivate: [AuthGuard] },
  { path: 'editar-entrada/:id', component: PostEditComponent, canActivate: [AuthGuard]},
  { path: 'entrada/:id', component: PostDetailComponent },

  { path: 'registro', component: RegisterComponent, /* canActivate: [SecureInnerPagesGuard] */},
  { path: 'forgot-password', component: ForgotPasswordComponent, /* canActivate: [SecureInnerPagesGuard]  */},
  { path: 'verify-email-address', component: VerifyEmailComponent, /* canActivate: [SecureInnerPagesGuard] */},

  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }