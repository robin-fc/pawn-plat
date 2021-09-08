<template>
  <div className="content__row content__navigation">
    <div v-show="isShowSwitch" className="switch">
      <div className="switch__title">
        {{ switchTitle }}
      </div>
      <div className="switch__control" @click="onSwitch">
        <div :className="`toggle ${toggleValue == 0 ? 'toggle__active' : ''}`">
          <div className="toggle__pin"></div>
        </div>
      </div>
    </div>
    <div v-if="!isLogin">
      <div class="center content__message">
        {{ languagePackage.toggleInfo }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import languageMixin from "@/mixins/language";

export default {
  name: "toggle",
  mixins: [languageMixin],
  data() {
    return {
      toggleValue: 0,
      switchTitle: "已经租入",
      isShowSwitch: false,
    };
  },
  watch: {
    toggleValue(val) {
      this.setToggleValue(val);
    },
    "$route.name"(val) {
      this.isShowSwitch = val == "dashboard";
      this.toggleValue = 0;
      this.switchTitle = this.languagePackage.dashToggleTitle[this.toggleValue];
    },
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {
    ...mapMutations(["setToggleValue"]),
    onSwitch() {
      if (this.toggleValue === 0) {
        this.toggleValue = 1;
        this.switchTitle = this.languagePackage.dashToggleTitle[1];
      } else {
        this.toggleValue = 0;
        this.switchTitle = this.languagePackage.dashToggleTitle[0];
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
