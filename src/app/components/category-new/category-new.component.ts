/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */
import { CategoryService } from './../../services/category.service';
import { UserService } from './../../services/user.service';
import { Category } from './../../models/category';
import { AuthenticationService } from './../../services/authentication.service';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss'],
  providers: [AuthenticationService],
})
export class CategoryNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public category: Category;
  public categories: Category[];  // Maybe in the future it gives an error
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _ngZone: NgZone,
  ) {
    this.page_title = 'Crear nueva categoría';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = {id: '',name:'', extraInfo: ''};
   }

  ngOnInit() {
  }

  onSubmit(form) {
    this._categoryService.createCategory(this.category).then(
      (result) => {
        this._ngZone.run(() => {
          this._router.navigate(['inicio']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}
