import store from '@/store/index'
export default (to, from, next) => {
    let auth = store.getters.auth;
    
    if(!auth){
        next({ name: 'about' });
        return false;
    }
}