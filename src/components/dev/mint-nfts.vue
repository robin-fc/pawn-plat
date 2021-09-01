<template>
  <div class="">
    <button className="menu__item" onClick={() => mintNFT(0)}>
        Mint 721A
      </button>
      <button className="menu__item" onClick={() => mintNFT(1)}>
        Mint 721B
      </button>
      <button className="menu__item" onClick={() => mintNFT(2)}>
        Mint 1155A
      </button>
      <button className="menu__item" onClick={() => mintNFT(3)}>
        Mint 1155B
      </button>
  </div>
</template>

<script>
//import PageHeaderLayout from '@/layouts/PageHeaderLayout'
//import { mapGetters } from 'vuex'
export default {
  name:"mintNFT",
//  components: {
//    PageHeaderLayout,
//  },
  data() {
    return {
      
    }
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
  methods: {
    
  },
}
</script>

<style lang='less' scoped></style>
