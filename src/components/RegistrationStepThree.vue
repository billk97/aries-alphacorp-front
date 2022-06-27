<template>
    <div>
        <div style="display: flex; justify-content: space-evenly">
            <div class="step">Step 1</div>
            <div class="step">Step 2</div>
            <div class="current-step">Step 3</div>
        </div>
        <div class="instructions">
            Accept the invitation and.... Success! Now you are connected.
            <img src="@/assets/celebrate.png" class="download-image" alt="">
        </div>
        <div style="display: flex; justify-content: space-evenly">
            <b-button @click="$emit('update-current-step', 2)" variant="primary">Back</b-button>
            <b-button @click="$emit('update-current-step', 3)" variant="success">finish</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "RegistrationStepThree",
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
