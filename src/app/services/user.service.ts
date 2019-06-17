/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

import { Injectable } from '@angular/core';


@Injectable()
export class UserService {

    public identity;
    public token;

    constructor() {
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('user'));

        if (identity && identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('accessToken');

        if(token && token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }
}