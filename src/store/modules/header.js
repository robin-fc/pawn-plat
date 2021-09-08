const state = {
  language: "zh",
  keywords: "",
};
const getters = {
  language: (state) => state.language,
  keywords: (state) => state.keywords,
};
const mutations = {
  setLanguage(state, data) {
    state.language = data;
  },
  setKeywords(state, data) {
    state.keywords = data;
  },
};

const actions = {};

export default {
  // namespaced: true,
  getters,
  state,
  mutations,
  actions,
};
