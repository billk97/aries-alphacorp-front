<template>
    <div class="create-employee orange-border">
        <b-form class="form-container">
            <b-form-group
                id="create-employee-input-croup"
                description="To register an employee please add the employees data here"
            >
                <h3>Register Employee</h3>
                <label>Firstname</label>
                <b-form-input
                    v-model="employee.firstName"
                    placeholder="Bill"
                    required
                    class="orange-border"
                />
                <label>Lastname</label>
                <b-form-input
                    v-model="employee.lastName"
                    placeholder="...."
                    required
                    class="orange-border"
                />
                <label>JobTile</label>
                <div>
                    <b-form-select
                        v-model="employee.jobTitle"
                        :options="availableJobTitles"
                        class="select"
                        required
                    />
                </div>
                <label>Email</label>
                <b-form-input
                    v-model="employee.email"
                    type="email"
                    placeholder="Enter the employees email"
                    required
                    class="orange-border"
                />
            </b-form-group>
            <img src="@/assets/create-employee.png" alt="my logo image">
        </b-form>
        <div class="submit-button">
            <b-button
                variant="success"
                @click="createEmployee"
                class="submit-button"
            >
                Submit
            </b-button>
        </div>
    </div>
</template>

<script>
    import employees from "@/services/employees";
    export default {
        name: "CreateEmployeesRoute",
        data() {
            return {
                availableJobTitles: ['software engineer', 'business analyst', 'accountant'],
                employee: {
                    firstName: "",
                    lastName: "",
                    jobTitle: "",
                    birthDate: null,
                    email: "",
                    mobileNumber: "",
                    didConnectionId: null,
                    permission: null
                }
            }
        },
        methods: {
            validateEmployee() {
                console.log("Data is valid")
            },
            createEmployee() {
                this.validateEmployee()
                employees.createEmployee(this.employee)
                this.$router.push("/employees")
            }
        }
    }
</script>

<style scoped>
    .create-employee {
        margin: 1% 15%;
        background-color: #f1f1f1;
        border-radius: 10px;
    }
    .form-container {
        display: flex;
        margin: 3%;
        justify-content: space-between;
    }
    .orange-border {
        border-width: 3px;
        border-radius: 10px;
        border-style: solid;
        border-color: #DF9342;
    }
    .select {
        width: 100%;
        border-width: 2px;
        border-radius: 10px;
        border-style: solid;
        border-color: #DF9342;
    }
    .submit-button {
        display: flex;
        justify-content: center;
    }

</style>
