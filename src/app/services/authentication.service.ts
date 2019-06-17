/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

import { User } from './../models/user';

import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
 
  userData: any; // Saves user data

  constructor(
    public _afs: AngularFirestore,
    public _afAuth: AngularFireAuth,
    public _router: Router,  
    public _ngZone: NgZone // NgZone service to aviod warning
  ) {
    /*
     * We save logged in user data in
     * local storage and set it to null
     * when user log out
     */
    this._afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password (for now we don't use it)
  SignIn(email, password) {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this._ngZone.run(() => {
          this._router.navigate(['inicio']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up con email/password
  SignUp(email, password) {
    return this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this._afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this._router.navigate(['verify-email-address']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this._afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this._afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this._ngZone.run(() => {
          this._router.navigate(['/inicio']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this._afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
     //  bio: user.bio
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this._afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this._router.navigate(['login']);
    })
  }

  readUser(id){
    return this._afs.collection('users').doc(id).valueChanges();
  }
  
  updateUser(user, id){
    console.log(user);
    return this._afs.collection('users').doc(id).update(user);
  }

}