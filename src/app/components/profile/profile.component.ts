/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

// TODO Remove identity and token

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PostService } from './../../services/post.service';
import { UserService } from './../../services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {

  public posts; //TODO specify that it is an array
  public identity;
  public user; // TODO specify that's a User
  public token;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.readProfile();
  }

  readUser(userId){
    this.user = this._userService.getIdentity();
  }

  readProfile() {
    this._route.params.subscribe(params => {
      let userId = params['id'];

      this.readUser(userId);
      this.readPosts(userId);
    })
    
  }

  readPosts(userId){
    this._postService.readPostsByUser(userId).subscribe(
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
        this.readProfile();
    })
  }

}
