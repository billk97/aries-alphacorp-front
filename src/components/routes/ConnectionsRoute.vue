<template>
    <div>
        <b-button @click="getConnections()">
            Refresh
        </b-button>
        <div v-for="c in items" :key="c.ConnectionID" class="table-container">
            <h5 style="text-align: center">
                Did Connection
            </h5>
            <b-row>
                <b-col cols="2" class="custom-row label">ConnectionId:</b-col>
                <b-col cols="10" class="custom-row value">{{c.ConnectionID}}</b-col>
            </b-row>
            <b-row>
                <b-col cols="2" class="custom-row label">InvitationID:</b-col>
                <b-col cols="10" class="custom-row value">{{c.InvitationID}}</b-col>
            </b-row>
            <b-row>
                <b-col cols="2" class="custom-row label">MyDID:</b-col>
                <b-col cols="10" class="custom-row value">{{c.MyDID}}</b-col>
            </b-row>
            <b-row>
                <b-col cols="2" class="custom-row label">State:</b-col>
                <b-col cols="10" class="custom-row value">{{c.State}}</b-col>
            </b-row>
            <b-row>
                <b-col cols="2" class="custom-row label">TheirDID:</b-col>
                <b-col cols="10" class="custom-row value">{{c.TheirDID}}</b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import connections from "@/services/connections";
    export default {
        name: "ConnectionsRoute",
        data() {
            return {
                apiUrl: `${process.env.VUE_APP_HOST_DOMAIN}/connections`,
                items: []
            }
        },
        created() {
            this.getConnections()
        },
        methods: {
            getConnections() {
                connections.getConnections().then(r => {
                    this.items = r.data.results
                })
            }
        }
    }
</script>

<style scoped>
    .table-container {
        margin: 10px;
        padding: 20px;
        border-radius: 10px;
        border-width: 3px;
        border-style: solid;
        border-color: #DF9342;
        background-color: #f1f1f1;
    }
    .label {
        background-color: #f6a753;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
    }

    .custom-row {
        text-align: left;
        margin-bottom: 2px;
        margin-top: 2px;

        border-style: solid;
        border-color: #f6a753;
        border-width: 2px;
    }
    .value {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
    }
</style>
