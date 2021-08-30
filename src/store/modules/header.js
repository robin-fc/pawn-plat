const state = {
    language: "zh",
}
const getters = {
    language: state => state.language
}
const mutations = {
    setLanguage(state, data) {
        state.language = data
    }
}

const actions = {

}

export default {
    // namespaced: true,
    getters,
    state,
    mutations,
    actions
}