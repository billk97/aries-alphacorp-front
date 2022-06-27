<template>
    <div class="login-container">
        <img src="@/assets/logo.png" class="uni-image" alt="">
        <div class="login-text"> AlphaCorp SSO </div>
        <div style="display: flex; justify-content: space-evenly">
        </div>
        <transition name="fade" mode="out-in">
            <img key="3" v-if="showImage" src="@/assets/certificate.png" class="certificate-image" alt="">
            <div key="1" v-if="showRegister">
                <register-component />
            </div>
        </transition>
        <div v-if="showButtons" class="custom-button register-button" @click="register()">
            Register as new Employee
        </div>
        <div v-if="showButtons" class="custom-button login-button" @click="login()">
            Admin Login
        </div>
    </div>
</template>

<script>
    import registerComponent from '@/components/RegisterComponent'
    export default {
        name: "RegistrationRoute",
        components: {
            registerComponent
        },
        data() {
            return {
                showImage: true,
                showRegister: false,
                showButtons: true
            }
        },
        methods: {
            hideImage() { this.showImage = false },
            register() {
                this.showRegister = true
                this.hideImage()
                this.showButtons = false
            },
            login() {
                this.hideImage()
                this.showButtons = false
            }
        }
    }
</script>

<style scoped>
    .login-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        margin-top: 4vh;
        margin-left: 37vw;
        margin-right: 37vw;
        border-radius: 10px;
        box-shadow: 0 0 10px 5px #888888;
        background-image: url('~@/assets/login-background.png');
        background-color: #f1f1f1;
        background-repeat: no-repeat;
        background-size: auto auto;
        background-position: 100% 50%;
    }

    @media screen and (max-width: 1800px){
        .login-container {
            margin-left: 37vw;
            margin-right: 37vw;
        }

    }

    @media screen and (max-width: 1200px){
        .login-container {
            margin-left: 30vw;
            margin-right: 30vw;
        }

    }

    @media screen and (max-width: 700px){
        .login-container {
            margin-left: 5vw;
            margin-right: 5vw;
        }

    }

    .login-text {
        color: #f1f1f1;
        font-weight: bold;
        font-size: x-large;
        text-shadow: 0 0 2px #24292E;
    }

    .uni-image {
        max-width: 64px;
        margin: 1vh auto;
        background-color: #24292E;
        border-radius: 5px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 2s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    .custom-button {
        margin: 1vh auto;
        padding: 10px;
        color: #f1f1f1;
        font-weight: bold;
        font-size: large;
        max-width: 230px;
        border-radius: 10px;
    }

    .register-button {
        background-color: #DF9342;
    }
    .register-button:hover {
        background-color: #d77f21;
        color: #ffffff;
        cursor: pointer;
    }
    .login-button {
        background-color: #89C1C3;
    }
    .login-button:hover {
        background-color: #3e9da1;
        color: #ffffff;
        cursor: pointer;
    }
</style>
