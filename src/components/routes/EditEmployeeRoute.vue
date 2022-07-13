<template>
    <div class="create-employee orange-border">
        <b-form class="form-container">
            <b-form-group
                v-if="employee"
                id="create-employee-input-croup"
            >
                <h3>Employee details</h3>
                <div class="orange-border attribute">
                    <label class="form-style" >ID: </label>
                    <span class="form-style"> {{employee.ID }} </span>
                </div>
                <div class="orange-border attribute">
                    <label class="form-style">Firstname: </label>
                    <span class="form-style"> {{employee.firstName }} </span>
                </div>
                <div class="orange-border attribute">
                    <label class="form-style">lastName: </label>
                    <span class="form-style"> {{employee.lastName }} </span>
                </div>
                <div class="orange-border attribute">
                    <label class="form-style">jobTitle: </label>
                    <span class="form-style"> {{employee.jobTitle }} </span>
                </div>
                <div class="orange-border attribute">
                    <label class="form-style">Email: </label>
                    <span class="form-style"> {{employee.email }} </span>
                </div>
                <div v-if="employee.didConnectionId" class="orange-border attribute">
                    <label class="form-style">connectionId: </label>
                    <span class="form-style"> {{employee.didConnectionId }} </span>
                </div>
                <div v-if="employee.invitation" class="orange-border attribute">
                    <label class="form-style">invitation: </label>
                    <span class="form-style"> {{employee.invitation }} </span>
                </div>
                <div v-if="employee.status" class="orange-border attribute">
                    <label class="form-style">status: </label>
                    <span class="form-style"> {{employee.status }} </span>
                </div>
                <div v-if="credentials.length > 0">
                    <div>Credential records</div>
                    <multiselect
                        v-if="selected"
                        v-model="selected"
                        :options="credentials"
                        label="text"
                        track-by="text"
                    >
                    </multiselect>
                </div>
                <div style="display:flex; justify-content: flex-end">
                    <b-button v-if="!showIssueCredentials" variant="success" @click="showIssueCredentials=true" style="margin-top: 5px">
                        Issue new credentials
                    </b-button>
                </div>
            </b-form-group>
            <issue-credentials v-if="showIssueCredentials" @show-issue-credentials="hideIssueCredentials" />
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
    import issueCredentials from "@/components/IssueCredentials";
    import VueJsonPretty from "vue-json-pretty"
    import 'vue-json-pretty/lib/styles.css';
    import Multiselect from 'vue-multiselect'

    export default {
        name: "EditEmployeeRoute",
        components: {
            issueCredentials,
            VueJsonPretty,
            Multiselect
        },
        watch: {
            showIssueCredentials: {
                handler(newVal, oldVal) {
                    if(newVal === true && newVal !== oldVal) {
                        this.selected = null
                    }
                }
            }
        },
        data() {
            return {
                employee: null,
                selected: null,
                credentials: [],
                showIssueCredentials: false,
            }
        },
        created() {
            this.getEmployeeData().then(() => {
                this.getCredentialRecords()
            })
        },
        methods: {
            hideIssueCredentials() {
                this.showIssueCredentials = false
            },
            async getEmployeeData() {
                const response = await employees.getEmployeeById(this.$route.params.id)
                this.employee = response.data
                this.$store.dispatch('updateEmployee', response.data)
            },
            async getCredentialRecords() {
                const response = await credentials.getCredentialsRecordsByConnectionId(this.employee.didConnectionId)
                let results  = []
                if(results <= 0) {
                    return
                }
                for(const r of response.data.results) {
                    let reck = {
                        text : r.cred_ex_record.cred_ex_id,
                        value: r
                    }
                    results.push(reck)
                }
                this.credentials = results
            }
        }
    }
</script>

<style scoped>

    .create-employee {
        margin: 1% 15%;
        background-color: #f1f1f1;
        border-radius: 10px;
        max-width: 1200px;
    }
    .form-container {
        margin: 3%;
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
    .form-style {
        margin-left: 3%;
    }
    .submit-button {
        display: flex;
        justify-content: center;
    }

</style>
