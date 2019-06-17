/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

import { UserService } from './../../services/user.service';
import { PostService } from './../../services/post.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public posts; //TODO specify that it is an array
  public identity;
  public token;

  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.page_title = 'Inicio';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {
    this.readPosts();
  }

  readPosts(){
    this._postService.readPosts().subscribe(
      response => {
        this.posts = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  deletePost(id) {
    this._postService.deletePost(id).then(
      response => {
        this.readPosts();
    })
  }
}
