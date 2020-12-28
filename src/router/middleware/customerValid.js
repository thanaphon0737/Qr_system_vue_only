import store from '@/store/index'

export default (to, from, next) => {
    let auth = store.getters.auth.isCustomer;
    if(!auth){
        next({name : 'notFoundPage'} )
        return false
    }
}