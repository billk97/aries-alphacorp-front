<template>
    <div>
        <div style="display: flex; justify-content: space-evenly">
            <div class="step">Step 1</div>
            <div class="current-step">Step 2</div>
            <div class="step">Step 3</div>
        </div>
        <div class="instructions">
            Scan the qr code or copy the text bellow and paste it in the wallet
        </div>
        <qr-code v-if="invitationBase" :text="invitationBase" class="qr-code"></qr-code>
        <div class="base-64-box">
            {{invitationBase}}
        </div>
        <div style="display: flex; justify-content: space-evenly">
            <b-button @click="$emit('update-current-step', 1)" variant="primary">
                Back
            </b-button>
            <b-button @click="$emit('update-current-step', 3)" variant="success">
                Next
            </b-button>
        </div>
    </div>
</template>

<script>
    import connection from "@/services/connections";
    export default {
        name: "RegistrationStepTwo",
        emits: ['update-current-step'],
        data() {
            return {
                invitation: null,
                invitationBase: null,
            }
        },
        created() {
            this.getInvitation()
        },
        methods: {
            getInvitation() {
                const uuid = this.getRouterParamUUID()
                connection.createInvitation(uuid).then(response => {
                    this.invitation = response.data.invitation
                    this.invitationBase = btoa(JSON.stringify(response.data.invitation))
                })
            },
            getRouterParamUUID() {
                return this.$route.params.uuid
            }
        }
    }
</script>

<style scoped>

    .qr-code {
        padding: 5px;
        background-color: #ffffff;
        border-radius: 10px;
        border: 3px #DF9342 solid;
        width: fit-content;
        margin: 0 auto;
    }
    .base-64-box {
        margin-top: 5%;
        margin-right: 5%;
        margin-left: 5%;
        padding: 5%;
        overflow-wrap: break-word;
        background-color: #edf4f6;
        border: 3px #DF9342 solid;
        border-radius: 10px;
    }


    .current-step {
        padding: 3px;
        background-color: rgb(131, 211, 123);
        border-radius: 10px;
        width: fit-content;
    }
    .step {
        padding: 3px;
        background-color: #ffffff;
        border-radius: 10px;
        width: fit-content;
    }
    .instructions {
        margin: 2%;
        padding: 2%;
        overflow-wrap: break-word;
        background-color: #edf4f6;
        border: 3px #DF9342 solid;
        border-radius: 10px;
    }

</style>
