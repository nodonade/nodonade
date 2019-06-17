/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

import { Post } from './../models/post';

import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private _afs: AngularFirestore,
  ) { }

  /*
   * For creating a post we generate an id and then asign
   * this id to the post.id
   */
  createPost(post: Post){
    let id = this._afs.createId();
    post.id = id;

    return this._afs.doc(`posts/${id}`).set(post);
  }

  readPosts() {
    return this._afs.collection('posts').valueChanges();
  }

  readPostsByUser(id) {
    return this._afs.collection('posts', 
      ref => ref.where('user_id', '==', id)
    ).valueChanges();
  }

  readPost(id) {
    return this._afs.collection('posts').doc(id).valueChanges();
  }

  updatePost(token, post, id) {
    return this._afs.doc('posts/' + post.id).update(post);
  }

  deletePost(id){
    return this._afs.doc('posts/' + id).delete();
  } 
}