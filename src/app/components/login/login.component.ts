/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    public authService: AuthenticationService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.page_title = 'Identifícate';

  }

  ngOnInit() {
    this.logout(); //It only logs out if the parameter sure is in the url
  }

  logout(){

    this._route.params.subscribe(params => {
      let logout = +params ['sure'];  // We use the + to parse the string to a number

      if (logout == 1) {
        this.authService.SignOut();
      }
    });
  }
}
