import api from '@/utils/api';

export default {
    createInvitation() {
        return api({
            url: '/connections/create-invitation',
            method: 'POST'
        })
    },
    getConnections() {
        return api({
            url: '/connections',
            method: 'GET'
        })
    },
    deleteConnection(connectionId) {
        return api({
            url: `/connections/${connectionId}`,
            method: 'DELETE'
        })
    }
}
