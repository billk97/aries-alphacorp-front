import api from '@/utils/api'

export default {
    getCredentialsRecordsByConnectionId(id) {
        return api({
            url: `/issue-credentials/${id}`,
            method: 'GET'
        })
    }
}

