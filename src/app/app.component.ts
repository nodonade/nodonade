/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

// TODO TRY TO REMOVE TOKEN AND IDENTITY AND ONLY USE GOOGLE AND EMAIL

// Services
import { CategoryService } from './services/category.service';
import { UserService } from "./services/user.service";

// Basic imports
import { Component, OnInit, DoCheck } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck { // Ojo al implements
  public title = 'NodoNade';
  public identity;
  public token;
  public categories;
 
  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService

  ) {
    this.loadUser();
    this.readCategories();
  }


  ngOnInit() {
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  readCategories(){
    this._categoryService.readCategories().subscribe(
      response => {
        this.categories = response;
      }
    )
  }
}
