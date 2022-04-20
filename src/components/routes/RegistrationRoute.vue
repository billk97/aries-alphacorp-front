<template>
    <div class="login-container">
        <img src="@/assets/logo.png" class="uni-image" alt="">
        <div>
            <div class="login-text"> Verifiable credentials login </div>
            <transition name="fade" mode="out-in">
                <img key="3" v-if="showImage" src="@/assets/certificate.png" class="certificate-image" alt="">
                <div key="1" v-if="showRegister">
                    <qr-code v-if="invitationBase" :text="invitationBase" class="qr-code"></qr-code>
                    <div class="base-64-box">
                        {{invitationBase}}
                    </div>
                </div>
            </transition>
            <div class="custom-button register-button" @click="register()">
                Register
            </div>
            <div class="custom-button login-button" @click="login()">
                Login
            </div>
        </div>
    </div>
</template>

<script>
    import connection from '@/services/connections'
    export default {
        name: "RegistrationRoute",
        components: {
        },
        data() {
            return {
                showImage: true,
                showRegister: false,
                invitation: null,
                invitationBase: null,
            }
        },
        methods: {
            hideImage() { this.showImage = false },
            register() {
                this.showRegister = true
                this.hideImage()
                this.getInvitation()
            },
            login() {
                this.hideImage()
            },
            getInvitation() {
                connection.createInvitation().then(response => {
                    this.invitation = response.data.invitation
                    console.log(this.invitation)
                    this.invitationBase = btoa(JSON.stringify(response.data.invitation))
                    console.log(this.invitationBase)
                })
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
    .login-text {
        color: #f1f1f1;
        font-weight: bold;
        font-size: x-large;
    }

    .uni-image {
        max-width: 64px;
        margin: 1vh auto;
        background-color: #24292E;
        border-radius: 5px;
    }
    .certificate-image {
        max-width: 65%;
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
        max-width: 130px;
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
