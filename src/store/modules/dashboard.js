const state = {
  selectedNftRepay: [], //将要归还的nft
  repaidNFT: "", //已经归还的nft
  dashboardToggleValue: 0,
};
const getters = {
  selectedNftRepay: (state) => state.selectedNftRepay,
  repaidNFT: (state) => state.repaidNFT,
  dashboardToggleValue: (state) => state.dashboardToggleValue,
};
const mutations = {
  setSelectedNftRepay(state, data) {
    state.selectedNftRepay = data;
  },
  setRepaidNFT(state, data) {
    state.repaidNFT = data;
  },
  setToggleValue(state, data) {
    state.dashboardToggleValue = data;
  },
};
const actions = {};

export default {
  getters,
  state,
  mutations,
  actions,
};
