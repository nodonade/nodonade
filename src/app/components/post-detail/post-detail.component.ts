/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */
import { PostService } from './../../services/post.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  public post;

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.readPost();
  }

  readPost() {
    // I extract the post id from the parameters
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._postService.readPost(id).subscribe(
        response => {
          if (response == undefined) {
            this._router.navigate(['/inicio']);
          } else {
          this.post = response;
        }
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
