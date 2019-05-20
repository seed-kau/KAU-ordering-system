import Vue from 'vue'
import Router from 'vue-router'
import Order from './pages/Order.vue'
import Admin from './pages/Admin.vue'
import Confirm from './pages/Confirm.vue'

Vue.use(Router)

export default new Router ({
    mode : 'history',
    routes : [{
        path : '/order/:tableNum',
        name : 'order',
        components : {
            default: Order,
        }
    },
    {
        path : '/confirm',
        name : 'confirm',
        components : {
            default: Confirm,
        }
    },
    {
        path : '/admin',
        name : 'admin',
        components : {
            default: Admin,
        }
    },]
})