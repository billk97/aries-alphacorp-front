import api from '@/utils/api'

export default {
    getCredentialsRecordsByConnectionId(id) {
        return api({
            url: `/issue-credentials/${id}`,
            method: 'GET'
        })
    },
    issueCredentials(id) {
        return api({
            url: `/issue-credentials/${id}`,
            method: 'POST'
        })
    },
    getPublicDid() {
        return api({
            url: `/wallet/did/public`,
            method: 'GET'
        })
    }
}

