import {login, getUserInfo } from '../../api/user'
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default {
    state: {
        // Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        Authorization: '',
        userInfo: localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : '',
    },

    actions: {
        Login({commit},user){
            const username = user.username.trim();
            const password = user.password.trim();
            return new Promise((resolve, reject)=>{
                login(username, password).then((response)=>{

                  const headers = response.headers;
                      if ( typeof(headers.authorization) === 'undefined'
                          || headers.authorization === null
                          || headers.authorization === '')
                      {
                          throw new Error('username or password error.');
                      }
                      commit('saveToken', headers.authorization);
                    resolve(response);
                }).catch((error)=>{
                     reject(error);
                });
            })
        },

        getUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    const data = response.data;
                    commit('saveUserInfo', data);
                    resolve(response);
                }).catch(
                    error => {
                        reject(error);
                    });
            });
        },
    },
    mutations:{
        saveToken(state, authorization) {
            state.Authorization = authorization;
            localStorage.setItem('Authorization', authorization);
        },
        saveUserInfo(state, userInfo) {
            state.UserInfo = userInfo;
            localStorage.setItem('userInfo', userInfo);
        },
        delToken(state){
            state.Authorization = '';
            localStorage.setItem('Authorization', state.Authorization);

        }
    },

    getters:{
        getUserInfo(state) {
            return state.UserInfo;
        },
    }
}
