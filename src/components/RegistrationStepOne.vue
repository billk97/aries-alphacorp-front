<template>
    <div>
        <div style="display: flex; justify-content: space-evenly">
            <div class="current-step">Step 1</div>
            <div class="step">Step 2</div>
            <div class="step">Step 3</div>
        </div>
        <div class="instructions">
            <img src="@/assets/download-app.png" class="download-image" alt="">
            Download the mobile app/wallet from
            the following link
            <a href="https://mobile.vsk.gr">https://mobile.vsk.gr</a>
        </div>
        <b-button
            @click="$emit('update-current-step', 2)"
            variant="success"
        >
            Next
        </b-button>
    </div>
</template>

<script>
export default {
    name: "RegistrationStepOne",
    emits: ['update-current-step'],
    methods: {
    }
}
</script>

<style scoped>
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
.download-image {
    max-width: 250px;
}

</style>
