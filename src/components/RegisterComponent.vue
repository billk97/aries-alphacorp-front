<template>
    <div>
        <div v-if="currentStep === 1">
            <registration-step-one @update-current-step="showStep"/>
        </div>
        <div v-if="currentStep === 2">
            <registration-step-two @update-current-step="showStep"/>
        </div>
        <div v-if="currentStep === 3">
            <registration-step-three @update-current-step="showStep"/>
        </div>
        <div v-if="currentStep === 4">
            <div>Step 3</div>
            <div>

            </div>
            <b-button @click="showStep(4)" variant="finish">finish</b-button>
        </div>
    </div>
</template>

<script>

    import RegistrationStepOne from '@/components/RegistrationStepOne'
    import RegistrationStepTwo from "@/components/RegistrationStepTwo";
    import RegistrationStepThree from "@/components/RegistrationStepThree";

    export default {
        name: "RegisterComponent",
        components: {
            RegistrationStepOne,
            RegistrationStepTwo,
            RegistrationStepThree
        },
        data() {
            return {
                currentStep: 1
            }
        },
        methods: {
            showStep(step) {
                this.currentStep = step
            }
        }
    }
</script>

<style scoped>


</style>
