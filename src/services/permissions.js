import api from "@/utils/api";

export default {

    getPermissions() {
        return api({
            url: `/permissions`,
            method: 'GET',
        })
    }
}
