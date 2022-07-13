export default {
    state: {
        employee: null
    },
    mutations: {
        setEmployee(state, employee) {
            console.log(employee)
            state.employee = employee
        }
    },
    actions: {
        updateEmployee({commit}, employee) {
            commit('setEmployee', employee)
        },
        clearEmployee({commit}) {
            commit('setEmployee', null)
        }
    },
    getters: {
        getEmployee: state => state.employee
    }
}
