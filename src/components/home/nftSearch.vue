<template>
  <div class="menu__item">
    <el-input
      :placeholder="languagePackage.searchHolder"
      v-model="keyword"
      class="input-with-select"
      @keyup.enter="handleSearch"
    >
      <template #append>
        <el-button icon="el-icon-search" @click="handleSearch"></el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
import languageMixin from "@/mixins/language";
import { mapMutations } from "vuex";

export default {
  mixins: [languageMixin],
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    ...mapMutations(["setKeywords"]),
    handleSearch() {
      this.setKeywords(this.keyword);
    },
  },
};
</script>

<style lang="less" scoped></style>
