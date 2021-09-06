const state = {
  selectedNftLend: [], //将要借出去的nft
  deleteLend: "",
};
const getters = {
  selectedNftLend: (state) => state.selectedNftLend,
  deleteLend: (state) => state.deleteLend,
};
const mutations = {
  setSelectedNftLend(state, data) {
    state.selectedNftLend = data;
  },
  setDeleteLend(state, data) {
    state.deleteLend = data;
  },
};
const actions = {};

export default {
  getters,
  state,
  mutations,
  actions,
};
