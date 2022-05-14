import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'Registration',
            component: () => import('@/components/routes/RegistrationRoute'),
            meta: {
                title: 'Register'
            }
        },
        {
            path: '/did-connections',
            name: 'Connections',
            component: () => import('@/components/routes/ConnectionsRoute'),
            meta: {
                title: 'Did-Connections'
            }
        }
    ]
})

export default router


