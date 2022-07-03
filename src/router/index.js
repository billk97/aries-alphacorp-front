import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/register/:uuid?',
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
        },
        {
            path: '/employees',
            name: 'Employees',
            component: () => import('@/components/routes/EmployeesRoute'),
            meta: {
                title: 'Employees'
            }
        },
        {
            path: '/employee/create',
            name: 'Create Employee',
            component: () => import('@/components/routes/CreateEmployeesRoute'),
            meta: {
                title: 'Employees-create'
            }
        },
        {
            path: '/employees/:id',
            name: 'Create Employee',
            component: () => import('@/components/routes/CreateEmployeesRoute'),
            meta: {
                title: 'Employees-create'
            }
        }
    ]
})

export default router


