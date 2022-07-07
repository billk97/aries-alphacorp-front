import api from "@/utils/api";

export default {
    getResources() {
        return api({
            url: `/resource/`,
            method: 'GET'
        })
    },

    createResource(resource) {
        return api({
            url: `/resource/`,
            method: 'POST',
            data: resource
        })
    }
}
