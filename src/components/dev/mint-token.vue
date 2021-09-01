<template>
  <div class="mint-tocken">
    <button className="menu__item" onClick={() => mintE20(1)}>
        Mint WETH
      </button>
      <button className="menu__item" onClick={() => mintE20(2)}>
        Mint DAI
      </button>
      <button className="menu__item" onClick={() => mintE20(3)}>
        Mint USDC
      </button>
      <button className="menu__item" onClick={() => mintE20(4)}>
        Mint USDT
      </button>
      <button className="menu__item" onClick={() => mintE20(5)}>
        Mint TUSD
      </button>
      <button className="menu__item" onClick={() => advanceTime(24 * 60 * 60)}>
        Advance time
      </button>
  </div>
</template>

<script>
//import PageHeaderLayout from '@/layouts/PageHeaderLayout'
//import { mapGetters } from 'vuex'
export default {
  //  components: {
  //    PageHeaderLayout,
  //  },
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

<style lang='less' scoped></style>