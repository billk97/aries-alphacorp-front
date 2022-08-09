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
import credentials from "@/services/credentials";

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
                        this.credentialOffer.filter.ld_proof.credential.credentialSubject.RoomCredential = newVal.map(r => r.alias)
                        if(this.employee.permissions) {
                            this.employee.permissions = []
                        }
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
                                    "https://api.alphacorp.vsk.gr/contexts/rooms/v1",
                                    "https://api.alphacorp.vsk.gr/contexts/alphacorp-employee/v1"
                                ],
                                type: ["VerifiableCredential", "AlphacorpCredential", "RoomCredential"],
                                issuer: null,
                                issuanceDate: "2020-01-01T12:00:00Z",
                                holder: null,
                                credentialSubject: {
                                    id: null,
                                    givenName: null,
                                    familyName: null,
                                    jobTitle: null,
                                    email: null,
                                    RoomCredential: []
                                }
                            },
                            options: {
                                "proofType": "BbsBlsSignature2020"
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
            this.fillCredentialWithData()
        },
        mounted() {
            this.fetchAvailableRooms()
        },
        methods: {
            async fillCredentialWithData(){
                const resp = await credentials.getPublicDid()
                const alphacorpPublicDid = "did:sov:" + resp.data.did
                this.credentialOffer.filter.ld_proof.credential.issuer = alphacorpPublicDid
                this.credentialOffer.filter.ld_proof.credential.issuanceDate = new Date().toISOString()
                this.credentialOffer.filter.ld_proof.credential.holder = "did:sov:" + this.employee.did
                this.credentialOffer.filter.ld_proof.credential.credentialSubject.id = "did:sov:" + this.employee.did
                this.credentialOffer.filter.ld_proof.credential.credentialSubject.givenName = this.employee.firstName
                this.credentialOffer.filter.ld_proof.credential.credentialSubject.familyName = this.employee.lastName
                this.credentialOffer.filter.ld_proof.credential.credentialSubject.jobTitle = this.employee.jobTitle
                this.credentialOffer.filter.ld_proof.credential.credentialSubject.email = this.employee.email
            },
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
                credentials.issueCredentials(this.employee.ID)
                this.$store.dispatch('clearEmployee')
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
