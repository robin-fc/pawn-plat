<template>
  <div className="header">
    <div className="header__logo"></div>
    <Button
      datacy="metamask-connect-button"
      onClick="{connect}"
      description="Connect"
    />
    ) : (
    <div className="header__wallet">
      <div className="header__wallet-network">
        <p className="headline pink-text"></p>
        <p className="copy-text">
          <span className="headline pink-text"> </span>
        </p>
      </div>

      <div className="header__wallet-user">
        <Link href="/profile">
          <a>
            <ShortenPopover
              longString="username||lookupAddress||currentAddress"
              data-cy="metamask-connect-button"
            />
          </a>
        </Link>
      </div>
    </div>
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

<style lang='scss' scoped></style>