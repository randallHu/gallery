import Vue from 'vue';
import Vuex from 'vuex'
import {deletePhoto, getThumbnailPhoto} from "../../api/photo";
import {getPhoto} from "@/api/photo";

Vue.use(Vuex);

export default {
    state:{
        url_id: [],
    },
    actions:{
        DeletePhoto({commit},id){
            const _id = id;
            return new Promise( (resolve, reject)=>{
                deletePhoto(_id).then(response=>{
                    resolve(response);
                }).catch(error=>{
                    reject(error);
                });
                }
            )
        },

        GetPhoto({commit}, id){
            const _id = id;
            return new Promise( (resolve, reject)=>{
                getPhoto(_id).then(response =>{
                    resolve(response);
                }).catch(error=>{
                    reject(error);
                })
            })
        },

        GetThumbnailPhoto({commit}, photo){
            return new Promise( (resolve, reject)=>{
                getThumbnailPhoto(photo.id).then(response =>{
                    photo.url = URL.createObjectURL(response.data);
                    commit('addUrlId',photo);
                    commit('sortUrlIdByTime');
                    resolve(response);
                }).catch(error=>{
                    reject(error);
                })
            })
        }

        //！！！！
        //1. 用map 将所有图片信息以此存入 state 和 缓存
        //2. 将current_page 和 total_pages存入state

    },
    mutations:{
        addUrlId(state,photo){
            state.url_id.push({
                    'id':photo.id,
                    'time':photo.time,
                    'type':photo.type,
                    'url':photo.url});
            console.log(state.url_id);
            },


        sortUrlIdByTime(state){
            state.url_id.sort(
                function (a, b) {
                    let value1 = a['time'];
                    let value2 = b['time'];
                    return value1 - value2;
                });
            //对缓存进行修改！！！！

        }

    },
    getters:{
        getUrlId(state){
            return state.url_id;
        }
    }
}