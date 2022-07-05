import api from '@/utils/api'

export default {
    getCredentialsRecordsByConnectionId() {
        return api({
            url: `/issue-credentials`,
            method: 'GET'
        })
    }
}

