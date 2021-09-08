const state = {
  selectedNftLend: [], //将要借出去的nft
  deleteLend: "", //刚才借出去的nft
  selectedNftLendToEdit: {}, //将编辑(撤销、更新、超时认领补偿)的借出去的nft
};
const getters = {
  selectedNftLend: (state) => state.selectedNftLend,
  deleteLend: (state) => state.deleteLend,
  selectedNftLendToEdit: (state) => state.selectedNftLendToEdit,
};
const mutations = {
  setSelectedNftLend(state, data) {
    state.selectedNftLend = data;
  },
  setDeleteLend(state, data) {
    state.deleteLend = data;
  },
  setSelectedNftLendToEdit(state, data) {
    state.selectedNftLendToEdit = data;
  },
};
const actions = {};

export default {
  getters,
  state,
  mutations,
  actions,
};
