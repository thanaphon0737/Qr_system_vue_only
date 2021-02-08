import store from '@/store/index'
export default (to, from, next) => {
    let auth = store.getters.auth.isWaiter;
    
    if(!auth){
        next({ name: 'about' });
        return false;
    }
}