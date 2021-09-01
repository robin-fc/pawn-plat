<template>
  <div className="menu__item">
    <el-select
      style="width: 100px"
      v-model="value"
      :placeholder="languagePackage.languagePlaceholder"
      @change="handleLanguageChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
//import PageHeaderLayout from '@/layouts/PageHeaderLayout'
import { mapMutations } from "vuex";
import languageMixin from "@/mixins/language";

export default {
  //  components: {
  //    PageHeaderLayout,
  //  },
  mixins: [languageMixin],
  data() {
    return {
      options: [
        {
          value: "zh",
          label: "中文",
        },
        {
          value: "en",
          label: "English",
        },
      ],
      value: "zh",
    };
  },
  methods: {
    ...mapMutations(["setLanguage"]),
    handleLanguageChange(val) {
      this.setLanguage(val);
    },
  },
};
</script>

<style lang='less' scoped></style>