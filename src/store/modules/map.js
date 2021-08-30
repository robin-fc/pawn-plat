const state = {
    scrollInfo: []
}
const getters = {
    scrollInfo: state => state.scrollInfo, 
}
const mutations = {
    setScrollInfo(state, data) {
        state.scrollInfo = data;
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