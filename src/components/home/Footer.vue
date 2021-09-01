<template>
  <div class="content-wrapper footer">
    <div class="footer__message font-VT323">
      <span class="notion"> {{ languagePackage.notion }}</span> 
      <a
        style="font-size: 14px; display: block; width: fit-content"
        href="https://etherscan.io/address/0x94d8f036a0fbc216bb532d33bdf6564157af0cd7"
        target="_blank"
        rel="noreferrer"
        >{{ languagePackage.constractAddress }}: 待填
      </a>
    </div>
    <div class="footer__content">
      <div class="copy">©Copyright RiverDao河里人合作社（{{ languagePackage.appVersion }}: 待填）</div>
      <div class="soc">
        <a
          href="https://discord.gg/5Gjs7zKq45"
          target="_blank"
          rel="noreferrer"
        >
          <span class="discord"></span>
        </a>
        <a
          href="https://twitter.com/RivermenNFT"
          target="_blank"
          rel="noreferrer"
        >
          <span class="twitter"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import languageMixin from "@/mixins/language";
export default {
  name: "Footer",
  mixins: [languageMixin],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang='less' scoped></style>