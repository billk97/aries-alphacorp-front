<template>
    <div class="issue-credentials">
        <div style="display: flex; justify-content: end">
            <b-button variant="danger" @click="$emit('show-issue-credentials', )"> Hide </b-button>
        </div>

        <div>
            Rooms allowed to access
        </div>
        <multiselect
            v-model="rooms"
            :options="availableRooms"
            :multiple="true"
            label="alias"
            track-by="alias"
        />
        <vue-json-pretty
            :data="credentialOffer"
            :showLine="true"
            class="orange-border"
            style="word-wrap: break-word !important; word-break: break-all; margin: 5%"
        >
        </vue-json-pretty>
        <b-button>
            Send and save user
        </b-button>
    </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty"
import 'vue-json-pretty/lib/styles.css';
import Multiselect from 'vue-multiselect'
import resources from "@/services/resources";

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
                    if(newVal !== oldVal ) {
                        this.credentialOffer.filter.ld_proof.credential.rooms = newVal.map(r => r.alias)
                    }
                }
            }
        },
        data() {
            return {
                rooms: [],
                availableRooms: ["room-a", "room-b", "room-c"],
                credentialOffer: {
                    connection_id: "92a93a7b-ddd3-46d3-ab47-135283a3e60a",
                    filter: {
                        ld_proof: {
                            credential: {
                                "@context": [
                                    "https://www.w3.org/2018/credentials/v1",
                                    "https://www.w3.org/2018/credentials/examples/v1"
                                ],
                                type: ["VerifiableCredential", "UniversityDegreeCredential"],
                                issuer: "did:sov:GHZXFFQdytHVVXywsQaukB",
                                issuanceDate: "2020-01-01T12:00:00Z",
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
            this.fetchAvailableRooms()
        },
        methods: {
            async fetchAvailableRooms() {
                const temp = await resources.getResources()
                this.availableRooms = temp.data
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
