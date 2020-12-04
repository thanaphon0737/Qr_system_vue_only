
import store from "../../store/index.js"

export const authLogIn = (to, from, next) => {
    let isLogIn = store.getters.isLogIn;
    console.log(store.getters)
    if( !isLogIn){
        next()
    }
}
export const authRole = (to, from, next) => {
    let role = store.getters.role_name;
    if(role == 'Manager'){
        next({ name: 'about'})
    }
}

export const authWaiter = (to, from, next) => {
    const role = store.getters.role_name;
    console.log('authwaiter',role)
    console.log(role == 'Waiter')
    if(role == 'Waiter'){
        next({path: `waiter/${store.getters.username}`})
    }
}