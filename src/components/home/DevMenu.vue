<template>
  <div>
    <div
      v-if="false"
      className="content-wrapper mb-l"
      style="flex-wrap: wrap"
    >
      <!-- <MintNfts />
      <MintTokens /> -->
    </div>
  </div>
</template>

<script>
//import MintNfts from '@/layouts/MintNfts'
//import { mapGetters } from 'vuex'
// const showMint = process.env.NEXT_PUBLIC_SHOW_MINT === "true";
export default {
  name: "DevMenu",
  //  components: {
  //    PageHeaderLayout,
  //  },
  data() {
    return {
      // showMint: showMint,
    };
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

<style lang='less' scoped></style>