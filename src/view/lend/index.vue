<template>
  <div class="content__row content__items">
    <div
      v-for="(nft, index) of lendNfts"
      :key="index"
      class="nft"
      :data-item-id="nft.token_id"
    >
      <div class="nft__overlay">
        <a
          class="nft__link"
          target="_blank"
          rel="noreferrer"
          :href="
            'https://rarible.com/token/0xcfff4c8c0df0e2431977eba7df3d3de857f4b76e:' +
            nft.token_id
          "
          ><img src="/assets/rarible.png" class="nft__icon" /></a
        ><a
          class="nft__link"
          target="_blank"
          rel="noreferrer"
          :href="
            'https://opensea.io/assets/0xcfff4c8c0df0e2431977eba7df3d3de857f4b76e/' +
            nft.token_id
          "
        >
          <img src="/assets/opensea.png" class="nft__icon" />
        </a>
        <div class="spacer"></div>
        <span
          v-if="false"
          :class="`MuiButtonBase-root
            MuiIconButton-root
            MuiCheckbox-root 
            ${nft.checked ? 'Mui-checked ' : ''}
            MuiCheckbox-colorSecondary
            MuiIconButton-colorSecondary`"
          aria-disabled="false"
        >
          <!-- @click="handleSelect(nft.token_id)" -->
          <span class="MuiIconButton-label"
            ><input
              class="jss"
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
                    :fill="nft.checked ? '#fc9706' : '#36cba5'"
                    width="25"
                    height="25"
                    class="front"
                  ></rect>
                  <polygon
                    :fill="nft.checked ? '#DF732C' : '#299b7c'"
                    points="25 25 0 25 6.74 32 32 32 25 25"
                    class="shadow"
                  ></polygon>
                  <polygon
                    :fill="nft.checked ? '#DF732C' : '#299b7c'"
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
        <img :alt="nft.description" :src="nft.image_url" />
      </div>
      <div class="nft__name">{{ `${nft.name}(${getZHName(nft.name)})` }}</div>
      <div class="nft__meta_row" v-for="(meta, index) of metas" :key="index">
        <div class="nft__meta_title">{{ meta }}</div>
        <div class="nft__meta_dot"></div>
        <div class="nft__meta_value">
          <a :href="nft[meta]" target="_blank" rel="noreferrer">{{
            nft[meta]
          }}</a>
        </div>
      </div>
      <div class="nft__control">
        <button class="nft__button" type="button" @click="LentNow(nft)">
          Lend now
        </button>
      </div>
    </div>
    <div class="batch" v-if="selectedToLend.length > 1">
      <div class="batch__inner">
        <div
          class="column"
          style="flex-grow: 1; font-size: 20px; color: rgb(255, 255, 255)"
        >
          {{ languagePackage.selected }} {{ selectedToLend.length }}
          {{ languagePackage.items }}
        </div>
        <div class="column">
          <button class="nft__button red" @click="handleCancel">
            {{ languagePackage.cancel }}</button
          ><span style="width: 24px; display: inline-flex"></span
          ><button class="nft__button" @click="handleLendAll">
            {{ languagePackage.lendAll }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dic from "@/model/counten.json";
import languageMixin from "@/mixins/language";
import { mapMutations } from "vuex";
export default {
  name: "lend",
  mixins: [languageMixin],
  data() {
    return { lendNfts: [], metas: [], selectedToLend: [], old_token_id: "" };
  },
  mounted() {
    this.getAssetsFromOSByAddress();
  },
  methods: {
    ...mapMutations(["setSelectedNftLend"]),
    LentNow(nft) {
      this.selectedToLend = [
        {
          token_id: nft.token_id,
        },
      ];
      this.setSelectedNftLend(this.selectedToLend);
    },
    //全部取消
    // handleCancel() {
    //   let item = {};
    //   this.selectedToLend.forEach((s) => {
    //     item = this.lendNfts.find((n) => n.token_id == s.token_id);
    //     item.checked = false;
    //   });
    //   this.selectedToLend = [];
    // },
    //勾选的全部出租
    // handleLendAll() {},
    //多选
    // handleSelect(token_id) {
    //   let item = this.lendNfts.find((n) => n.token_id == token_id);
    //   item.checked = !item.checked;
    //   if (item.checked) {
    //     this.selectedToLend.push(item);
    //   } else {
    //     let index = this.selectedToLend.findIndex(
    //       (n) => (n.token_id = token_id)
    //     );
    //     if (index > -1) {
    //       this.selectedToLend.splice(index, 1);
    //     }
    //   }
    // },
    //单选
    // handleSelect(token_id) {
    //   let vm = this;
    //   function cancelOld() {
    //     let item = vm.lendNfts.find((n) => (n.token_id == vm.old_token_id));
    //     if (item) {
    //       item.checked = false;
    //     }
    //   }
    //   let item = this.lendNfts.find((n) => n.token_id == token_id);
    //   if (item) {
    //     item.checked = !item.checked;
    //   }
    //   if (item.checked) {
    //     if (item.token_id != vm.old_token_id) {
    //       cancelOld();
    //       vm.old_token_id = item.token_id
    //     }
    //     this.selectedToLend = [item];
    //   } else {
    //     this.selectedToLend = [];
    //   }
    // },
    getZHName(enname) {
      return dic.find((n) => n.en == enname).type || "";
    },
    //获取钱包资产
    getAssetsFromOSByAddress() {
      let params = {
        owner: "0x27aa5a880B512bEaF40D1B2E0F256b09f5711444",
        asset_contract_address: "0xcfff4c8c0df0e2431977eba7df3d3de857f4b76e",
        order_direction: "desc",
        offset: 0,
        limit: 5,
      };
      axios
        .get("https://api.opensea.io/api/v1/assets", {
          params: params
        })
        .then((res) => {
          if (res && res.status == 200) {
            this.lendNfts = res.data.assets.map((n) => {
              n.checked = false;
              return n;
            });
          }
        })
        .catch((err) => {
          err;
        });
    },
  },
};
</script>