<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
  >
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
            ><img src="/assets/rarible.png" class="nft__icon"/></a
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
            :class="
              `MuiButtonBase-root
            MuiIconButton-root
            MuiCheckbox-root 
            ${nft.checked ? 'Mui-checked ' : ''}
            MuiCheckbox-colorSecondary
            MuiIconButton-colorSecondary`
            "
            aria-disabled="false"
          >
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
        <!-- <div class="nft__meta_row">
          <div class="nft__meta_title">{{ languagePackage.address }}</div>
          <div class="nft__meta_dot"></div>
          <div class="nft__meta_value">
          <a
            v-if="meta == 'Address' || meta == '合约地址'"
            :href="nft.nftAddress"
            target="_blank"
            rel="noreferrer"
            >{{ nft.nftAddress }}</a
          >
          <span>
            {{ getContentRow(nft, meta) }}
          </span>
        </div>
        </div> -->
        <div class="nft__control">
          <button
            v-if="!isApprovedForAll"
            class="nft__button"
            type="button"
            @click="handleClickToApprove()"
          >
            {{ languagePackage.approve }}
          </button>
          <button
            v-else
            class="nft__button"
            type="button"
            @click="LentNow(nft)"
          >
            {{ languagePackage.lendNow }}
          </button>
        </div>
      </div>
    </div>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="[2, 10, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <div
      class="content__nonfts center"
      v-if="lendNfts.length == 0 && accounts && accounts[0]"
    >
      抱歉当前网络下的账户没有请求到可以租出的NFT
    </div>
  </div>
</template>

<script>
// import { ethers } from "ethers";
// import { abi as ERC721abi } from "@/api/ERC721.json";
import axios from "axios";
import dic from "@/model/counten.json";
import languageMixin from "@/mixins/language";
import { mapGetters, mapMutations } from "vuex";
import { contactPP } from "@/api/contact";
import { contactRivermen_signer } from "@/api/contact";

export default {
  name: "lend",
  mixins: [languageMixin],
  data() {
    return {
      lendNfts: [],
      selectedToLend: [],
      old_token_id: "",
      total: 0,
      currentPage: 1,
      pageSize: 20,
      loading: false,
      isApprovedForAll: false,
    };
  },
  async mounted() {
    if (this.accounts[0]) {
      this.getAssetsFromOSByAddress();
      this.isApprovedForAll = await this.judgeApprove();
    }
  },
  computed: {
    ...mapGetters(["accounts", "deleteLend", "keywords"]),
  },
  watch: {
    async accounts(val) {
      if (val[0]) {
        this.getAssetsFromOSByAddress();
        this.isApprovedForAll = await this.judgeApprove();
      }
    },
    deleteLend(val) {
      let index = this.lendNfts.findIndex((n) => n.token_id == val);
      if (index > -1) {
        this.lendNfts.splice(index, 1);
        this.lendNftsCache = this.lendNfts.slice();
      }
    },
    keywords(val) {
      if (!val) {
        this.lendNfts = this.lendNftsCache.slice(
          this.pageSize * (this.currentPage - 1),
          this.pageSize * this.currentPage
        );
      } else {
        this.lendNfts = this.lendNftsCache.filter(
          (r) => r.token_id == val || r.name.indexOf(val) > -1
        );
        this.currentPage = 1;
        this.pageSize = 20;
      }
    },
  },
  methods: {
    ...mapMutations(["setSelectedNftLend"]),
    async handleClickToApprove() {
      try {
        await contactRivermen_signer.setApprovalForAll(
          process.env.VUE_APP_PAWNPLAT_ADDRESS,
          true
        );
        this.$confirm("交易正在打包，请等待pending完成后刷新页面")
          .then(() => {})
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        this.$confirm(error.message)
          .then(() => {
            console.log(error.code);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    async judgeApprove() {
      let isApproved = await contactRivermen_signer.isApprovedForAll(
        this.accounts[0],
        process.env.VUE_APP_PAWNPLAT_ADDRESS
      );
      return isApproved;
    },
    initPagination() {
      this.total = 0;
      this.currentPage = 1;
      this.pageSize = 20;
    },
    handleCurrentPageChange(val) {
      this.currentPage = val;
      this.lendNfts = this.lendNftsCache.slice(
        this.pageSize * (val - 1),
        this.pageSize * val
      );
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.lendNfts = this.lendNftsCache.slice(0, val);
    },
    LentNow(nft) {
      this.selectedToLend = [
        {
          token_id: nft.token_id,
        },
      ];
      console.log(this.selectedToLend);
      this.setSelectedNftLend(this.selectedToLend);
    },
    getZHName(enname) {
      let item = dic.find((n) => n.en == enname);
      if (item) {
        return item.type;
      } else {
        return "";
      }
    },
    getContentRow(nft, meta) {
      switch (meta) {
        case "Address":
          return `https://etherscan.io/address/${nft.asset_contract.address}`;
        case "合约地址":
          return `https://etherscan.io/address/${nft.asset_contract.address}`;
        case "Token id":
          return nft.token_id;
        case "NFT编号":
          return nft.token_id;
        case "Standard":
          return nft.asset_contract.schema_name;
        case "执行标准":
          return nft.asset_contract.schema_name;
        default:
          break;
      }
    },
    //获取钱包资产
    async getAssetsFromOSByAddress() {
      this.loading = true;
      //拿合约市场的所有token
      this.tokenList = await contactPP.getTokenList(
        process.env.VUE_APP_ERC721_ADDRESS
      );
      //从opensea拿此人所有没被租出去的资产，被租的已经查不到了
      let params = {
        owner: this.accounts[0],
        asset_contract_address: process.env.VUE_APP_RIVERMEN_ADDRESS,
        order_direction: "desc",
        offset: 0,
        limit: 50,
      };
      axios
        .get(process.env.VUE_APP_OPENSEA, {
          params: params,
        })
        .then((res) => {
          if (res && res.status == 200) {
            this.lendNfts = res.data.assets.map((n) => {
              n.checked = false;
              return n;
            });
            this.total = this.lendNfts.length;
            this.lendNftsCache = this.lendNfts.slice();
            // console.log(this.lendNfts);
            // console.log(this.tokenList);
          }
        })
        .catch((error) => {
          this.$confirm(error.toString())
            .then(() => {
              console.log(error);
            })
            .catch((e) => {
              console.log(e);
            });
        });
      this.loading = false;
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
  },
};
</script>
