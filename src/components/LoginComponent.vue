<template>
    <div>
        <div>Username</div>
        <input type="text" placeholder="Admin" v-model="username"/>
        <div>Password</div>
        <input type="password" placeholder="****" v-model="password"/>
        <div/>
        <div style="margin-top: 5px">

        </div>
        <b-button variant="primary" @click="$emit('back-to-register')" style="margin: 2px">Back</b-button>
        <b-button variant="success" @click="login" style="margin: 2px">Login</b-button>
    </div>
</template>

<script>


    export default {
        name: "LoginComponent",
        emits: ['back-to-register'],
        components: {
        },
        data() {
            return {
                username: null,
                password: null
            }
        },
        methods: {
            login() {
                this.$store.dispatch('login', {username: this.username, password: this.password})
            }
        }
    }
</script>

<style scoped>


</style>
