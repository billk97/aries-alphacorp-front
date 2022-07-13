import api from  '@/utils/api'


export default {
    getEmployees() {
        return api(
            {
                url: '/employees',
                method: 'GET'
            }
        )
    },
    getEmployeeById(id) {
        return api(
            {
                url: `/employees/${id}`,
                method: 'GET'
            }
        )
    },
    createEmployee(employee) {
        return api(
            {
                url: `/employees`,
                method: 'POST',
                data: employee
            }
        )
    },
    updateEmployee( employee) {
        return api(
            {
                url: `/employees/${employee.ID}`,
                method: 'PUT',
                data: employee
            }
        )
    }

}
