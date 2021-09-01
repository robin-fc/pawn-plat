<template>
  <div class="content__row content__items">
    <div
      class="nft nft__erc721"
      data-item-id="7942"
      data-flip-config='{"stagger":true,"translate":true,"scale":true,"opacity":true}'
      data-flip-id="0xcfff4c8c0df0e2431977eba7df3d3de857f4b76e::7942::0"
      data-portal-key="portal"
    >
      <div class="nft__overlay">
        <a
          class="nft__link"
          target="_blank"
          rel="noreferrer"
          href="https://rarible.com/token/0xcfff4c8c0df0e2431977eba7df3d3de857f4b76e:7942"
          ><img src="/assets/rarible.png" class="nft__icon" /></a
        ><a
          class="nft__link"
          target="_blank"
          rel="noreferrer"
          href="https://opensea.io/assets/0xcfff4c8c0df0e2431977eba7df3d3de857f4b76e/7942"
        >
          <img src="/assets/opensea.png" class="nft__icon" />
        </a>
        <div class="spacer"></div>
        <span
          class="
            MuiButtonBase-root
            MuiIconButton-root
            jss47
            MuiCheckbox-root
            jss46
            MuiCheckbox-colorSecondary
            MuiIconButton-colorSecondary
          "
          aria-disabled="false"
          ><span class="MuiIconButton-label"
            ><input
              class="jss50"
              type="checkbox"
              data-indeterminate="false"
              value="" /><svg
              class="MuiSvgIcon-root"
              focusable="false"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <rect
                    fill="#36cba5"
                    width="25"
                    height="25"
                    class="front"
                  ></rect>
                  <polygon
                    fill="#299b7c"
                    points="25 25 0 25 6.74 32 32 32 25 25"
                    class="shadow"
                  ></polygon>
                  <polygon
                    fill="#299b7c"
                    points="32 6.74 32 32 25 25 25 0 32 6.74"
                    class="shadow"
                  ></polygon>
                </g>
              </g></svg></span
        ></span>
      </div>
      <div class="nft__image">
        <img
          alt="More details will be revealed soon."
          src="https://lh3.googleusercontent.com/qjj3iFhxK4iXV9tbOeKjdKoF3wjARJKya3qCComnnTB2tPeNAuZ3cjGT68Akh3ySkenLe8j1fzaQjeqR9DblI8wSj4_Y2mUSd08JyQ=s250"
        />
      </div>
      <div class="nft__name">懒得要死的士卒</div>
      <div class="nft__meta_row">
        <div class="nft__meta_title">Address</div>
        <div class="nft__meta_dot"></div>
        <div class="nft__meta_value">
          <a
            href="https://etherscan.io/address/0xcfff4c8c0df0e2431977eba7df3d3de857f4b76e"
            target="_blank"
            rel="noreferrer"
            >0xcfff4c8c0df0e2431977eba7df3d3de857f4b76e</a
          >
        </div>
      </div>
      <div class="nft__meta_row">
        <div class="nft__meta_title">Token id</div>
        <div class="nft__meta_dot"></div>
        <div class="nft__meta_value">7942</div>
      </div>
      <div class="nft__meta_row">
        <div class="nft__meta_title">Standard</div>
        <div class="nft__meta_dot"></div>
        <div class="nft__meta_value">721</div>
      </div>
      <div class="nft__control">
        <button class="nft__button" type="button">Lend now</button>
      </div>
    </div>
  </div>
</template>

<script>
//import PageHeaderLayout from '@/layouts/PageHeaderLayout'
//import { mapGetters } from 'vuex'
export default {
  name: "rent",
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