<template>
  <div className="content__row content__navigation">
    <div v-if="isShowSwitch" className="switch">
      <div className="switch__title">
        {{ switchTitle }}
      </div>
      <div className="switch__control" @click="onSwitch">
        <div :className="`toggle ${toggleValue == 0 ? 'toggle__active' : ''}`">
          <div className="toggle__pin"></div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="center content__message">Please connect your wallet!</div>
    </div>
  </div>
</template>

<script>
//import PageHeaderLayout from '@/layouts/PageHeaderLayout'
//import { mapGetters } from 'vuex'
import languageMixin from "@/mixins/language";

export default {
  //  components: {
  //    PageHeaderLayout,
  //  },
  name: "toggle",
  mixins: [languageMixin],
  data() {
    return {
      toggleValue: 0,
      switchTitle: "",
      isShowSwitch: true,
    };
  },
  watch: {
    language() {
      this.initSwitchTitle();
    },
  },
  mounted() {
    this.initSwitchTitle();
  },
  methods: {
    initSwitchTitle() {
      switch (this.$route.name) {
        case "rent":
          this.isShowSwitch = true;
          this.switchTitle =
            this.languagePackage.rentToggleTitle[this.toggleValue];
          break;
        case "lend":
          this.isShowSwitch = true;
          this.switchTitle =
            this.languagePackage.lendToggleTitle[this.toggleValue];
          break;
        default:
          this.isShowSwitch = false;
          break;
      }
    },
    onSwitch() {
      if (this.toggleValue === 0) {
        this.toggleValue = 1;
      } else {
        this.toggleValue = 0;
      }
      this.initSwitchTitle();
    },
  },
};
</script>

<style lang='less' scoped></style>