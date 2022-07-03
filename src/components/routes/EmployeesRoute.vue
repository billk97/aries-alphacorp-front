<template>
    <div>
        <div class="filters">
            <b-button
                variant="primary"
                @click="fetchEmployees"
                style=" align-self: end;"
            >
                Refresh
            </b-button>
            <b-button
                variant="success"
                :to="'employee/create'"
                style=" align-self: end;"
            >
                New Employee
            </b-button>
        </div>
        <div class="table-container">
            <b-table
                id="id"
                :fields="fields"
                :items="employees"
                responsive
                hover
                bordered
                class="table"
            >
                <template v-slot:cell(actions)>
                    <b-button variant="primary">
                        Edit
                    </b-button>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
    import employees from "@/services/employees";
    export default {
        name: "EmployeeRoute",
        data() {
            return {
                fields: [
                    {key: 'ID', label: "employeeId", thClass: 'bg-dark text-light' },
                    {key: 'CreatedAt', label: 'CreatedAt', thClass: 'bg-dark text-light'},
                    {key: 'status', label: "Employee Status", thClass: 'bg-dark text-light'},
                    {key: 'didConnectionId', label: "Employee didConnection", thClass: 'bg-dark text-light' },
                    {key: 'actions', thClass: 'bg-dark text-light', tdClass: 'text-center'}
                ],
                employees: [
                    {
                        id: "1234",
                        status: "Connected",
                        didConnection: "1234"
                    },
                    {
                        id: "1235",
                        status: "Credentials Issued",
                        didConnection: "1235"
                    },
                    {
                        id: "1236",
                        status: "Invitation send",
                        didConnection: "1236"
                    }
                ]
            }
        },
        created() {
            this.fetchEmployees()
        },
        methods: {
            async fetchEmployees() {
                const response = await employees.getEmployees()
                this.employees = response.data.result


            },
        }
    }
</script>

<style scoped>
    .filters {
        padding-top: 10px;
        padding-left: 0.5%;
        padding-right: 0.5%;
        display: flex;
        justify-content: space-between;
    }
    .table-container {
        display: flex;
        padding: 0.5%;
    }
    .table {
        margin-top: 5px;
        background-color: #f1f1f1;
    }
    .header {
        background-color: #24292E;
        color: #f1f1f1;
        /*bg-dark*/
        /*text-light*/
    }
</style>
