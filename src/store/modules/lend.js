const state = {
    selectedNftLend: [] //将要借出去的nft
}
const getters = {
    selectedNftLend: state => state.selectedNftLend
}
const mutations = {
    setSelectedNftLend(state, data) {
        state.selectedNftLend = data
    }
}
const actions = {}

export default {
    getters,
    state,
    mutations,
    actions
}