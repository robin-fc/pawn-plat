const state = {
  selectedNftRent: [], //将要租的nft
  rentedNFT: "",
};
const getters = {
  selectedNftRent: (state) => state.selectedNftRent,
  rentedNFT: (state) => state.rentedNFT,
};
const mutations = {
  setSelectedNftRent(state, data) {
    state.selectedNftRent = data;
  },
  setRentedNFT(state, data) {
    state.rentedNFT = data;
  },
};
const actions = {};

export default {
  getters,
  state,
  mutations,
  actions,
};
