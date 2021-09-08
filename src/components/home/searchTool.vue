<template>
  <div className="menu menu__search">
    <!-- <nftFilter />
    <nftSort /> -->
    <NftSearch />
    <LanguageSelect />
  </div>
</template>

<script>
// import NftFilter from "./nftFilter.vue";
// import NftSort from "./nftSort.vue";
import NftSearch from "./nftSearch.vue";
import LanguageSelect from "./languageSelect.vue";

//import { mapGetters } from 'vuex'
export default {
  components: {
    // NftFilter,
    // NftSort,
    NftSearch,
    LanguageSelect,
  },
  data() {
    return {};
  },
  // 计算属性，会监听依赖属性值随之变化
  //  computed: {
  //   ...mapGetters(['userPermissions','buttonType'])
  // },
  // 监控data中的数据变化
  //watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  // created() {}
  // beforeMount() {}, // 生命周期 - 挂载之前
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //beforeDestroy() {}, // 生命周期 - 销毁之前
  // 方法集合
  methods: {},
};
</script>

<style lang="less" scoped></style>
