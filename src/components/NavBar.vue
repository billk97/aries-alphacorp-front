<template>
    <b-navbar toggleable="lg" type="dark" class="nav-bar">
        <img src="@/assets/logo.png" alt="my logo image" style="margin-left: 10px;">
        <b-navbar-brand href="/register">
            <p id="fullName" ref="fullName" style="margin-left: 10px; min-width: 100px; margin-top: 11px;" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav v-if="isLoggedIn">
                <b-nav-item href="/did-connections">
                    Did-connections
                </b-nav-item>
                <b-nav-item href="/employees">
                    Employees
                </b-nav-item>
                <b-nav-item href="/resources">
                    Resources
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
        <b-button v-if="isLoggedIn" variant="danger" @click="logout" style="margin: 5px;">
            Logout
        </b-button>
    </b-navbar>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {
            i: 0,
            text: 'AlphaCorp',
            speed: 50
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        }
    },
    mounted() {
        this.typeWriter()
    },
    methods: {
        typeWriter() {
            if (this.i < this.text.length) {
                this.$refs.fullName.innerText += this.text.charAt(this.i)
                this.i ++
                setTimeout(this.typeWriter, this.speed)
            }
        },
        logout() {
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style scoped>

.nav-bar {
    background-color: #24292E;
    font-weight: bold;
    border-radius: 0 0 5px 5px;
}

</style>
