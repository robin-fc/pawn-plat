const state = {
    accounts: [],
    isLogin: false,
    reconnect: 0
}
const getters = {
    accounts: state => state.accounts,
    isLogin: state => state.isLogin,
    reconnect: state => state.reconnect
}
const mutations = {
    setAccounts(state, data) {
        state.accounts = data;
        state.isLogin = true;
    },
    setIsLogin(state, data) {
        state.isLogin = data
    },
    setReconnect(state, data) {
        state.reconnect = data
    }
}

const actions = {

}

export default {
    getters,
    state,
    mutations,
    actions
}