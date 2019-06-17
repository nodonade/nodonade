/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { PostService } from './../../services/post.service';
import { CategoryService } from './../../services/category.service';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';


import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Post } from '../../models/post';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss'],
  providers: [AuthenticationService, UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {

  page_title: string;
  public is_edit;
  public identity;
  public token;
  public post: Post;
  public categories;
  public uploadPercent;
  file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _afStorage: AngularFireStorage,
    private _postService: PostService
  ) {
    this.page_title = 'Crear una entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {
    this.post = {id :'',user_id : this.identity.uid, category_id : 1, title : '', content : '', image :'', createdAt : '', imageURL : ''};
    this.getCategories();
  }

  onSubmit(form) {
    this._postService.createPost(this.post).then(
      response => {
        this._router.navigate(['inicio']);
      }
    );
  }

  getCategories() {
    this._categoryService.readCategories().subscribe(
      response => {
        this.categories = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  upload(event) {
    const randomId = Math.random().toString(36).substring(2);
    this.post.image = randomId;
    this._afStorage.upload(`/upload/${randomId}`, event.target.files[0]).then(
      response => {
        let ref = this._afStorage.ref(`/upload/${this.post.image}`);
        ref.getDownloadURL().subscribe(response =>{
          this.post.imageURL = response;
          console.log(this.post.imageURL);
        });
      }
    );
  }
}
