<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { mapGetters, mapMutations } from "vuex";
import Layout from "@/layout";
import languageMixin from "@/mixins/language";
export default {
  name: "App",
  mixins: [languageMixin],
  components: {
    Layout,
  },
  computed: {
    ...mapGetters(["chainId", "reconnect"]),
  },
  async mounted() {
    await this.handleConnect();
    this.initialize();
  },
  watch: {
    reconnect() {
      this.handleConnect();
    },
  },
  methods: {
    ...mapMutations(["setAccounts", "setIsLogin"]),
    async handleConnect() {
      let vm = this;
      if (!window.ethereum.chainId) {
        try {
          let accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          let chainId = window.ethereum.chainId;
          if (chainId == process.env.VUE_APP_CHAIN_ID) {
            this.setAccounts(accounts);
          } else {
            this.handleWrongChainId();
          }
        } catch (err) {
          if (err.code === 4001) {
            ElMessage({
              message: vm.languagePackage.toggleInfo,
            });
          } else {
            console.error(err);
          }
        }
      } else if (window.ethereum.chainId == process.env.VUE_APP_CHAIN_ID) {
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        this.setAccounts(accounts);
      } else {
        this.handleWrongChainId();
      }
    },
    handleWrongChainId() {
      ElMessage({
        message: "你当前帐号不在主网络，请切换到以太坊Ethereum主网络重新登录！",
        type: "error",
      });
      this.setAccounts([]);
      this.setIsLogin(false);
    },
    async initialize() {
      let vm = this;
      window.ethereum.on("accountsChanged", (accounts) => {
        if (window.ethereum.chainId != process.env.VUE_APP_CHAIN_ID) {
          vm.handleWrongChainId();
          return;
        }
        vm.setAccounts(accounts);
      });
      window.ethereum.on("chainChanged", (newChainId) => {
        if (newChainId !== process.env.VUE_APP_CHAIN_ID) {
          vm.handleWrongChainId();
        }
      });
    },
  },
};
</script>
