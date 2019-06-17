/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
// import { User } from './../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user// : User;
  public identity;

  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

  constructor(private _authService: AuthenticationService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.page_title = 'Ajustes de usuario';
    this.user = { uid: '', email: '', displayName: '', photoURL: '', emailVerified: false,/* bio: ''*/ };
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    this.readUser();
  }

  onSubmit(form) {
    this._authService.updateUser(this.user, this.user.uid).then(
      response => {
        this.readUser();
        this._router.navigate(['/inicio']);
      }, error => {

      }
    );
  }
  
  readUser() {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._authService.readUser(id).subscribe(
        response => {
          if (response == undefined) {
            this._router.navigate(['/inicio']);
          } else {
            this.user = response;
            console.log(this.user);
            if (this.user.uid != this.identity.uid) {
              this._router.navigate(['/inicio']);
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
