/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */
import { UserService } from '../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService,
    public authService: AuthenticationService
  ) { 
    this.page_title = 'Regístrate';
    // this.user = new User(-1, '', '', 'ROLE_USER', '', '', '', '');
  }
  ngOnInit() {
    // console.log(this._userService.test());
  }

  onSubmit(form) {

    // this._userService.register(this.user).subscribe(
    //   response => {
        
    //     if(response.status == "succes") {
    //       this.status = response.status;
    //       form.reset();
    //     } else {
    //       this.status = 'error';
    //     }
    //   },
    //   error => {
    //     this.status = 'error';
    //     console.log(<any>error);
    //   }
    // );
  }

}
