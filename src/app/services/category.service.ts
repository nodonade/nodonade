/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

import { Category } from './../models/category';

import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _afs: AngularFirestore,
  ) { }

  /*
   * For creating a category we generate an id and then asign
   * this id to the category.id
   */
  createCategory(category: Category){
    let id = this._afs.createId();
    category.id = id;

    return this._afs.doc(`categories/${id}`).set(category);
  }

  readCategories() {
    return this._afs.collection('categories').valueChanges();
  }

  readCategory(id) {
    return this._afs.collection('categories').doc(id).valueChanges();
  }

  readPosts(id) {
    return this._afs.collection('posts', 
    ref => ref.where('category_id', '==', id)).valueChanges();
  }

  updateCategory(category: Category){
    this._afs.doc('categories/' + category.id).update(category);
  }

  deleteCategory(category: Category){
    this._afs.doc('categories/' + category.id).delete();
  } 
} 
