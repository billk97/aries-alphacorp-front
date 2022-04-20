<template>
    <b-navbar toggleable="lg" type="dark" class="nav-bar">
        <img src="@/assets/logo.png" alt="my logo image" style="margin-left: 10px;">
        <b-navbar-brand href="/">
            <p id="fullName" ref="fullName" style="margin-left: 10px; min-width: 100px; margin-top: 11px;" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
<!--        <b-collapse id="nav-collapse" is-nav>-->
<!--            <b-navbar-nav>-->
<!--                <b-nav-item href="/">-->
<!--                    About-->
<!--                </b-nav-item>-->
<!--                <b-nav-item href="#">Projects</b-nav-item>-->
<!--                <b-nav-item-dropdown text="Utils">-->
<!--                    <b-dropdown-item href="/utils/encrypt">Encrypt/Decrypt</b-dropdown-item>-->
<!--                    <b-dropdown-item href="/utils/jwt">JWT utils</b-dropdown-item>-->
<!--                    <b-dropdown-item href="/utils/hash">Hashing utils</b-dropdown-item>-->
<!--                </b-nav-item-dropdown>-->
<!--                <b-nav-item href="#">Blog</b-nav-item>-->
<!--            </b-navbar-nav>-->
<!--        </b-collapse>-->
    </b-navbar>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {
            i: 0,
            text: 'University',
            speed: 50
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
