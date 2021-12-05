// @ts-ignore
import { browser } from '$app/env';
import { writable } from 'svelte/store';
 
const _isAuth = browser ? window.localStorage.getItem('isAuth') === 'true' : false;
export const isAuth = writable(_isAuth);
isAuth.subscribe(value => {
    if (browser) {
        window.localStorage.setItem('isAuth', value.toString());
    }
});

export const l_Customer = browser ? localStorage.getItem('Customer') : null;
export const Customer = writable(l_Customer);
Customer.subscribe(value => {
    if(browser)
        localStorage.setItem('Customer', value);
});

export const l_Customer_Token = browser ? localStorage.getItem('Customer_Token') : null;
export const Customer_Token = writable(l_Customer_Token);
Customer_Token.subscribe(value => {
    if(browser)
        localStorage.setItem('Customer_Token', value);
});