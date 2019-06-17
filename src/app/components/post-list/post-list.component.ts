/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

import { PostService } from './../../services/post.service';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() posts;
  @Input() identity;
  constructor(
    private _postService: PostService,
  ) { }

  ngOnInit() {
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
