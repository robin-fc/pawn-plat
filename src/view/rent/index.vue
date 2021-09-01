<template>
  <div class="content__row content__items">
    <div
      v-for="(nft, index) of nfts"
      :key="index"
      class="nft"
      :data-item-id="nft.tocken"
    >
      <div class="nft__overlay">
        <a
          class="nft__link"
          target="_blank"
          rel="noreferrer"
          :href="
            'https://rarible.com/token/0xcfff4c8c0df0e2431977eba7df3d3de857f4b76e:' +
            nft.id
          "
          ><img src="/assets/rarible.png" class="nft__icon" /></a
        ><a
          class="nft__link"
          target="_blank"
          rel="noreferrer"
          :href="
            'https://opensea.io/assets/0xcfff4c8c0df0e2431977eba7df3d3de857f4b76e/' +
            nft.id
          "
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
              value=""
            />
            <svg
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
              </g>
            </svg>
          </span>
        </span>
      </div>
      <div class="nft__image">
        <img alt="More details will be revealed soon." :src="nft.img" />
      </div>
      <div class="nft__name">{{ nft.title }}</div>
      <div class="nft__meta_row">
        <div class="nft__meta_title">{{ nt.address }}</div>
        <div class="nft__meta_dot"></div>
        <div class="nft__meta_value">
          <a
            :href="`https://etherscan.io/address/${nft.address}`"
            target="_blank"
            rel="noreferrer"
            >{{ nft.address }}</a
          >
        </div>
      </div>
      <div class="nft__meta_row">
        <div class="nft__meta_title">{{ nft.Tokenid }}</div>
        <div class="nft__meta_dot"></div>
        <div class="nft__meta_value">nft.Tokenid</div>
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
export default {
  name: "rent",
  data() {
    return { nfts: [] };
  },
  async mounted() {
    //通过合约获取所有正在租赁的rivermen的id,然后异步去opensea拿数据,做展示
    let nftIds = await this.getIdsByContact();
    this.getNftInfos(nftIds);
  },
  methods: {
    async getIdsByContact() {},
    async getNftInfos(nftIds) {
      console.log(nftIds);
    },
  },
};
</script>

<style lang='scss' scoped></style>