/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

import { CategoryService } from './../../services/category.service';
import { UserService } from './../../services/user.service';
import { PostService } from 'src/app/services/post.service';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  providers: [CategoryService, UserService]
})
export class CategoryDetailComponent implements OnInit {

  public page_title: string;
  public category;
  public posts: any;
  public identity;
  public token;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _postService: PostService
  ) { 
    this.page_title = 'Categoría';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.readPostsByCategory();
  }

  readPostsByCategory() {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._categoryService.readCategory(id).subscribe(
        response => {
          this.category = response;

          this._categoryService.readPosts(id).subscribe(
            response => {
              this.posts = response;
            },
            error => {
              console.log(error)
            }
          )
        },
        error => {
          this._router.navigate(['/inicio']);
        }
      )
    })
  }

  deletePost(id) {
    this._postService.deletePost(id).then(
      response => {
        this.readPostsByCategory();
    })
  }
}
