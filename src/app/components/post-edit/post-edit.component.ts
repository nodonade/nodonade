/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { PostService } from './../../services/post.service';
import { CategoryService } from './../../services/category.service';
import { UserService } from './../../services/user.service';

import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  page_title: string;
  public identity;
  public token;
  public post;
  public categories;
  public uploadPercent;
  public is_edit: boolean;
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
    this.page_title = 'Editar entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = true;
   }

  ngOnInit() {
    this.post = {id :'',user_id : this.identity.uid, category_id : 1, title : '', content : '', image :'', createdAt : '', imageURL : ''};
    this.getCategories();
    this.readPost();
  }

  onSubmit(form) {
    this._postService.updatePost(this.token, this.post, this.post.id).then(
      response => {
        this._router.navigate(['/entrada', this.post.id]);
      }, error => {

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

  readPost() {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._postService.readPost(id).subscribe(
        response => {
          if (response == undefined) {
            this._router.navigate(['/inicio']);
          } else {
          this.post = response;
          if (this.post.user_id != this.identity.uid) {
            this._router.navigate(['/inicio']);
          }
        }
        },
        error => {
          console.log(error);
        }
      );
    });
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
