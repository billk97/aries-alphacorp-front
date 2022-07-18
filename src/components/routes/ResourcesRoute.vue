<template>
    <div>
        <div class="filters">
            <b-button
                variant="primary"
                @click="fetchResources"
                style=" align-self: end;"
            >
                Refresh
            </b-button>
            <b-button
                variant="success"
                @click="showForm=true"
                style=" align-self: end;"
            >
                New resource
            </b-button>
        </div>
        <b-form-group
            v-if="showForm"
            id="create-employee-input-croup"
            class="orange-border form-container"
        >
            <h3>Add new resource</h3>
            <label>Alias</label>
            <b-form-input
                v-model="newResource.alias"
                placeholder="room-1"
                required
                class="orange-border"
            />
            <label>Description</label>
            <b-form-input
                v-model="newResource.description"
                placeholder="A NICE ROOM"
                required
                class="orange-border"
            />
            <label>PERMISSION</label>
            <div v-if="newResource.permission" class="orange-border">
                {{newResource.permission.alias}}
            </div>
            <b-button variant="success" @click="createNewResource">
                Submit
            </b-button>
        </b-form-group>
        <div class="table-container">
            <b-table
                id="id"
                :items="resources"
                :fields="fields"
                responsive
                hover
                bordered
                class="table"
            >
                <template v-slot:cell(permission)="data">
                    {{data.item.permission.alias}}
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
    import resources from "@/services/resources";
    export default {
        name: "ResourcesRoute",
        watch: {
            'newResource.alias' : {
                handler(newVal, oldVal) {
                    if(newVal !== oldVal ) {
                        this.newResource.permission = {
                            alias: this.formatPermission(newVal)
                        }
                    }
                }
            }
        },
        data() {
            return {
                fields: [
                    {key: 'ID', label: "ID", thClass: 'bg-dark text-light'},
                    {key: 'alias', label: 'Alias', thClass: 'bg-dark text-light'},
                    {key: 'description', label: "Description", thClass: 'bg-dark text-light'},
                    {key: 'permission', label: "Permission", thClass: 'bg-dark text-light'},
                ],
                resources: [],
                showForm: false,
                newResource: {}
            }
        },
        created() {
            this.fetchResources()
        },
        methods: {
            async fetchResources() {
                const response = await resources.getResources()
                this.resources = response.data
            },
            async createNewResource() {
                await resources.createResource(this.newResource)
                await this.fetchResources()
                this.showForm = false
            },
            formatPermission(string) {
                let formatted = "CAN_ACCESS_"
                string = this.toUpperCase(string)
                string = this.toSnakeCase(string)
                formatted = formatted + string
                return formatted
            },
            toUpperCase(string) {
                return string.toUpperCase(string)
            },
            toSnakeCase(string) {
                return string.replaceAll(" ", "_")
            }
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
    .orange-border {
        border-width: 3px;
        border-radius: 10px;
        border-style: solid;
        border-color: #DF9342;
    }
    .form-container {
        display: flex;
        margin: 3%;
        justify-content: center;
        background-color: #f1f1f1;
        border-radius: 10px;
        padding: 10px;
    }
</style>
