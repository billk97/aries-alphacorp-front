<template>
    <div>
        <div class="settings">
            <h3><b-icon icon="filter-circle-fill" style="margin-left: 10px"/></h3>
            <b-button @click="getConnections()" variant="primary">
                Refresh
            </b-button>
        </div>
        <div v-for="c in items" :key="c.ConnectionID" class="table-container">
            <h4 style="text-align: center; margin-bottom: 1px">
                Did Connection
            </h4>
            <div style="display: flex; justify-content: end; margin-bottom: 2px">
                <b-button
                    variant="danger"
                    @click="deleteConnection(c.connection_id)"
                >
                    DELETE Connection
                </b-button>
            </div>
            <b-row>
                <b-col cols="2" class="custom-row label">ConnectionId:</b-col>
                <b-col cols="10" class="custom-row value">{{c.connection_id}}</b-col>
            </b-row>
            <b-row>
                <b-col cols="2" class="custom-row label">Label:</b-col>
                <b-col cols="10" class="custom-row value">{{c.their_label}}</b-col>
            </b-row>
            <b-row>
                <b-col cols="2" class="custom-row label">MyDID:</b-col>
                <b-col cols="10" class="custom-row value">{{c.my_did}}</b-col>
            </b-row>
            <b-row>
                <b-col cols="2" class="custom-row label" :class="{ 'label-complete': c.rfc23_state === 'completed'}">State:</b-col>
                <b-col cols="10" class="custom-row value">{{c.rfc23_state}}</b-col>
            </b-row>
            <b-row>
                <b-col cols="2" class="custom-row label">TheirDID:</b-col>
                <b-col cols="10" class="custom-row value">{{c.their_did}}</b-col>
            </b-row>
            <b-row>
                <b-col cols="2" class="custom-row label">Their role:</b-col>
                <b-col cols="10" class="custom-row value">{{c.their_role}}</b-col>
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
            },
            deleteConnection(connectionId) {
                connections.deleteConnection(connectionId).then(() => {
                    this.getConnections()
                })
            }
        }
    }
</script>

<style scoped>

    .settings {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        border-radius: 10px;
        border-width: 3px;
        border-style: solid;
        border-color: #DF9342;
        background-color: rgba(79, 76, 76, 0.6);
    }
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
    .label-complete {
        background-color: #55B677;
    }

    .custom-row {
        text-align: left;
        margin-bottom: 2px;
        margin-top: 2px;

        border-style: solid;
        border-width: 2px;
    }
    .value {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
    }
</style>
