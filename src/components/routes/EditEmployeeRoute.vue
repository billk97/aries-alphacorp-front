<template>
    <div class="create-employee orange-border">
        <b-form class="form-container">
            <b-form-group
                v-if="employee"
                id="create-employee-input-croup"
                description="To register an employee please add the employees data here"
            >
                <h3>Employee details</h3>
                <div class="orange-border attribute">
                    <label style="margin-left: 3%">ID: </label>
                    <span style="margin-right: 3%"> {{employee.ID }} </span>
                </div>
                <div class="orange-border attribute">
                    <label style="margin-left: 3%">Firstname: </label>
                    <span style="margin-right: 3%"> {{employee.firstName }} </span>
                </div>
                <div class="orange-border attribute">
                    <label style="margin-left: 3%">lastName: </label>
                    <span style="margin-right: 3%"> {{employee.lastName }} </span>
                </div>
                <div class="orange-border attribute">
                    <label style="margin-left: 3%">jobTitle: </label>
                    <span style="margin-right: 3%"> {{employee.jobTitle }} </span>
                </div>
                <div class="orange-border attribute">
                    <label style="margin-left: 3%">Email: </label>
                    <span style="margin-right: 3%"> {{employee.email }} </span>
                </div>
                <div v-if="employee.didConnectionId" class="orange-border attribute">
                    <label style="margin-left: 3%">connectionId: </label>
                    <span style="margin-right: 3%"> {{employee.didConnectionId }} </span>
                </div>
                <div v-if="employee.invitation" class="orange-border attribute">
                    <label style="margin-left: 3%">invitation: </label>
                    <span style="margin-right: 3%"> {{employee.invitation }} </span>
                </div>
                <div v-if="employee.status" class="orange-border attribute">
                    <label style="margin-left: 3%">status: </label>
                    <span style="margin-right: 3%"> {{employee.status }} </span>
                </div>
                <div v-if="credentials.length > 0">
                    <b-form-select
                        v-model="selected"
                        :options="credentials"
                    >
                    </b-form-select>
                </div>
            </b-form-group>
            <img src="@/assets/create-employee.png" style="max-height: 500px" alt="my logo image">
        </b-form>
            <vue-json-pretty
                v-if="selected"
                :data="selected"
                :showLine="true"
                class="orange-border"
                style="word-wrap: break-word !important; word-break: break-all; margin: 5%"
            >
            </vue-json-pretty>
    </div>
</template>

<script>
    import employees from "@/services/employees";
    import credentials from "@/services/credentials";
    import VueJsonPretty from "vue-json-pretty"
    import 'vue-json-pretty/lib/styles.css';
    export default {
        name: "EditEmployeeRoute",
        components: {
            VueJsonPretty
        },
        data() {
            return {
                employee: null,
                selected: null,
                credentials: []
            }
        },
        created() {
            this.getEmployeeData().then(() => {
                this.getCredentialRecords()
            })
        },
        methods: {
            async getEmployeeData() {
                const response = await employees.getEmployeeById(this.$route.params.id)
                this.employee = response.data
            },
            async getCredentialRecords() {
                const response = await credentials.getCredentialsRecordsByConnectionId()
                let results  = []
                for(const r of response.data.results) {
                    let reck = {
                        text : r.cred_ex_record.cred_ex_id,
                        value: r
                    }
                    results.push(reck)
                }

                this.credentials = results
            },
            show(c) {
                c.show = true
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
    .attribute {
        border-width: 1px !important;
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }
    .submit-button {
        display: flex;
        justify-content: center;
    }

</style>
