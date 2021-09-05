<template>
  <div className="header">
    <div className="header__logo"></div>
    <button
      v-if="!isLogin"
      class="nft__button"
      data-cy="metamask-connect-button"
      type="button"
      @click="handleConect"
    >
      {{ languagePackage.connectWallet }}
    </button>
    <div v-else className="header__wallet">
      <div className="header__wallet-network">
        <p className="headline black-text"></p>
        <p className="copy-text">
          <span className="headline black-text">
            {{ languagePackage.currentAccountAddress }}</span
          >
        </p>
      </div>
      <div className="header__wallet-user">
        <a href="/profile">{{ accounts[0] }}</a>
      </div>
    </div>
  </div>
</template>

<script>
//import PageHeaderLayout from '@/layouts/PageHeaderLayout'
import { mapGetters, mapMutations } from "vuex";
import languageMixin from "@/mixins/language";

export default {
  mixins: [languageMixin],
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapGetters(["accounts", "isLogin"]),
  },
  methods: {
    ...mapMutations(["setReconnect"]),
    handleConect() {
      this.setReconnect(new Date().getTime() + "_" + this.accounts[0]);
    },
  },
};
</script>

<style lang='scss' scoped></style>