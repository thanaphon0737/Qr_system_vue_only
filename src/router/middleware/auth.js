import store from '@/store/index'
export default (to, from, next) => {
    let auth = store.getters.auth.isLogged;
    if(!auth){
        next({ name: 'login' });
        return false;
    }
}