import api from "@/utils/api";

export default {
    login(data) {
        return api({
            url: `admin/login`,
            method: 'POST',
            data: data
        })
    },
}
