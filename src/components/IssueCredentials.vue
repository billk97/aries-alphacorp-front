<template>
    <div class="issue-credentials">
        <div style="display: flex; justify-content: end">
            <b-button variant="danger" @click="$emit('show-issue-credentials', )"> Hide </b-button>
        </div>
        <div>
            Employee permissions
        </div>
        <multiselect
            v-if="rooms"
            v-model="rooms"
            :options="availablePermissions"
            :multiple="true"
            label="alias"
            track-by="alias"
        />
        Employee credential preview
        <vue-json-pretty
            v-if="credentialOffer"
            :data="credentialOffer"
            :showLine="true"
            class="orange-border"
            style="word-wrap: break-word !important; word-break: break-all; margin: 5%"
        />
        <b-button variant="primary" @click="addPermissionsToUser">
            1. Add permissions to employee
        </b-button>
        <b-button variant="success" v-if="showSecondButton" @click="sendCredentialOffer">
            2. Issue Credentials
        </b-button>
    </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty"
import 'vue-json-pretty/lib/styles.css';
import Multiselect from 'vue-multiselect'
import employees from "@/services/employees";
import permissions from "@/services/permissions";

export default {
        name: "IssueCredentials",
        emits: ['show-issue-credentials'],
        components: {
            VueJsonPretty,
            Multiselect
        },
        watch: {
            rooms: {
                handler(newVal, oldVal) {
                    if(newVal && (newVal !== oldVal )) {
                        this.credentialOffer.filter.ld_proof.credential.rooms = newVal.map(r => r.alias)
                        if(this.employee.permissions) {
                            this.employee.permissions = []
                        }
                        console.log(newVal)
                        this.employee.permissions = newVal
                    }
                }
            }
        },
        data() {
            return {
                rooms: [],
                availablePermissions: [],
                employee: null,
                showSecondButton: false,
                credentialOffer: {
                    connection_id: null,
                    filter: {
                        ld_proof: {
                            credential: {
                                "@context": [
                                    "https://www.w3.org/2018/credentials/v1",
                                    "https://www.w3.org/2018/credentials/examples/v1"
                                ],
                                type: ["VerifiableCredential", "UniversityDegreeCredential"],
                                issuer: "did:sov:GHZXFFQdytHVVXywsQaukB //needs to be fetched dynamicaly",
                                issuanceDate: "2020-01-01T12:00:00Z",
                                holder: "did:sov:GHZXFFQdytHVVXywsQaukB // this need to be the subjects",
                                credentialSubject: {
                                    degree: {
                                        type: "BachelorDegree",
                                        name: "bill"
                                    },
                                    college: "bill College"
                                },
                                rooms: []
                            },
                            options: {
                                "proofType": "Ed25519Signature2018"
                            }
                        }
                    }
                }
            }
        },
        created() {
            this.employee = this.$store.getters.getEmployee
            this.credentialOffer.connection_id = this.employee.didConnectionId
            this.rooms = this.employee.permissions
            this.fetchAvailableRooms()
        },
        methods: {
            async fetchAvailableRooms() {
                const temp = await  permissions.getPermissions()
                this.availablePermissions = temp.data
            },
            addPermissionsToUser() {
                this.$store.dispatch('updateEmployee', this.employee)
                employees.updateEmployee(this.employee)
                this.showSecondButton = true
            },
            sendCredentialOffer() {
                this.$emit('show-issue-credentials', )
            }
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
    .orange-border {
        border-width: 3px;
        border-radius: 10px;
        border-style: solid;
        border-color: #DF9342;
    }
    .issue-credentials {
    }
</style>
