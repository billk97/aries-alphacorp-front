export default {
    state: {
        employee: null
    },
    mutations: {
        setEmployee(state, employee) {
            this.state.employee = employee
        }
    },
    actions: {
        updateEmployee({commit}, employee) {
            console.log(employee)
            commit('setEmployee', employee)
        },
        clearEmployee({commit}) {
            commit('setEmployee', null)
        }
    }
}
