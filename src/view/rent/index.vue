<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
  >
    <div class="content__row content__items">
      <div
        v-for="(nft, index) of rentNfts"
        :key="index"
        class="nft"
        :data-item-id="index"
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

        <div class="nft__meta_row" v-for="(meta, key) of metas" :key="key">
          <div class="nft__meta_title">{{ meta }}</div>
          <div class="nft__meta_dot"></div>
          <div class="nft__meta_value">
            <a
              v-if="meta == 'Address' || meta == '合约地址'"
              :id="nft.token_id + '-' + key"
              :href="getContentRow(nft, meta, key)"
              target="_blank"
              rel="noreferrer"
            >
            </a>
            <span
              v-else
              :id="nft.token_id + '-' + key"
              >{{ getContentRow(nft, meta, key) }}
            </span>
          </div>
        </div>

        <div class="nft__control">
          <button
            :class="nft.isInPool ? 'nft__button' : 'nft__button disabled'"
            :disabled="!nft.isInPool"
            type="button"
            @click="RentNow(nft)"
          >
            {{ languagePackage.rentNow }}
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
      v-if="rentNfts.length == 0 && accounts && accounts[0]"
    >
      抱歉当前网络下的账户没有请求到可以租出的NFT
    </div>
  </div>
</template>

<script>
import dic from "@/model/counten.json";
import { mapGetters, mapMutations } from "vuex";
import languageMixin from "@/mixins/language";
import { contactPP } from "@/api/contact.js";

export default {
  name: "rent",
  mixins: [languageMixin],
  data() {
    return {
      rentNfts: [],
      metas:
        this.language == "zh"
          ? [
              "合约地址",
              "拥有者",
              "NFT编号",
              "执行标准",
              "租金（eth/天）",
              "最长租期 (天)",
              "缴纳抵押金（eth）",
            ]
          : [
              "Address",
              "Owner",
              "Token id",
              "Standard",
              "Daily price[per day][eth]",
              "Max duration [days]",
              "Collateral [per item][eth]",
            ],
      total: 0,
      currentPage: 1,
      pageSize: 20,
      loading: false,
    };
  },
  beforeMount() {
    this.conectContract();
  },
  computed: {
    ...mapGetters(["rentedNFT", "accounts"]),
  },
  watch: {
    rentedNfts(val) {
      let index = this.rentNfts.findIndex((n) => n.token_id == val); //将市场中被租走的标记一下
      if (index > -1) {
        this.rentNfts[index].isInPool = false;
      }
    },
  },
  methods: {
    ...mapMutations(["setSelectedNftRent"]),
    initPagination() {
      this.total = 0;
      this.currentPage = 1;
      this.pageSize = 20;
    },
    handleCurrentPageChange(val) {
      this.currentPage = val;
      this.rentNfts = this.rentNftsCache.slice(
        this.pageSize * (val - 1),
        this.pageSize * val
      );
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.rentNfts = this.rentNftsCache.slice(0, val);
    },
    //连接租赁合约并返回合约对象
    async conectContract() {
      this.initPagination();
      this.loading = true;
      try {
        let tokenList = await contactPP.getTokenList(
          process.env.VUE_APP_ERC721_ADDRESS
        );
        console.log(tokenList);
        this.total = tokenList.length;
        let nftsIdList = tokenList.map((nft) => {
          return nft.toString();
        });
        let tIds = Array.from(nftsIdList);
        console.log(tIds);
        this.getNtfInfo(tIds);
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    //根据id异步去opensea拿数据,做展示
    async getNtfInfo(tIds) {
      let token_ids = "token_ids=" + tIds.join("&token_ids=");
      //测试网
      let url = `${process.env.VUE_APP_RINKEBY}?${token_ids}&order_direction=desc&offset=0&limit=${tIds.length}&collection=rivermen`; //
      //主网
      // let url = `${process.env.VUE_APP_RINKEBY}?${token_ids}&asset_contract_address=${process.env.VUE_APP_RIVERMEN_ADDRESS}&order_direction=desc&offset=0&limit=${tIds.length}`;
      fetch(url, { method: "GET" })
        .then((response) => response.json())
        .then(async (res) => {
          if (res && typeof res.assets == "object") {
            //opensea对象结构数据
            let tempAssets = res.assets.map((n) => {
              n.checked = false;
              return n;
            });
            this.rentNftsCache = tempAssets.slice();
            let temp = this.rentNftsCache.slice(0, 20);
            console.log(temp);

            //批量判断是否已经被租了
            let paramIds = [];
            for (let index = 0; index < temp.length; index++) {
              paramIds[index] = temp[index].token_id;
            }
            let arrIsInPool = await contactPP.checkPool(
              process.env.VUE_APP_ERC721_ADDRESS,
              paramIds
            );
            temp.map((n, i) => {
              n.isInPool = arrIsInPool[i];
              return n;
            });
            console.log(temp);

            //每个nft获取租赁信息
            this.rentNfts = temp;
            this.rentNfts.forEach(async (n) => {
              let lendingValue = await contactPP.LendingPool(
                process.env.VUE_APP_ERC721_ADDRESS, // 河里人合约地址
                n.token_id
              );
              n.owner = lendingValue.owner;
              n.dailyRentPrice = parseInt(lendingValue.price.toString()) / 1e18;
              n.duration =
                parseFloat(lendingValue.duration.toString()) / (3600 * 24);
              n.collateral =
                parseInt(lendingValue.collateral.toString()) / 1e18;
            });
          }
        })
        .catch((err) => console.error(err));
    },
    //通过合约获取所有正在租赁的rivermen的id
    async RentNow(nft) {
      this.selectedToRent = [
        {
          token_id: nft.token_id,
          dailyRentPrice: 0,
          duration: 0,
          collateral: 0,
        },
      ];
      //拿所有出租数据，避免又去请求
      let dom1 = document.getElementById(`${nft.token_id}-4`);
      let dom2 = document.getElementById(`${nft.token_id}-5`);
      let dom3 = document.getElementById(`${nft.token_id}-6`);
      this.selectedToRent[0].dailyRentPrice = dom1 ? dom1.innerHTML : 0;
      this.selectedToRent[0].duration = dom2 ? dom2.innerHTML : 0;
      this.selectedToRent[0].collateral = dom3 ? dom3.innerHTML : 0;

      console.log(this.selectedToRent);
      this.setSelectedNftRent(this.selectedToRent);
    },
    getZHName(enname) {
      let item = dic.find((n) => n.en == enname);
      if (item) {
        return item.type;
      } else {
        return "";
      }
    },
    async getContentRow(nft, meta, index) {
      let value = "";
      let dom = {};
      try {
        switch (meta) {
          case "Address":
            value = `https://cn.etherscan.com/address/${nft.asset_contract.address}`;
            break;
          case "合约地址":
            value = `https://cn.etherscan.com/address/${nft.asset_contract.address}`;
            break;
          case "拥有者":
            value = nft.owner;
            break;
          case "Owner":
            value = nft.owner;
            break;
          case "Token id":
            value = nft.token_id;
            break;
          case "NFT编号":
            value = nft.token_id;
            break;
          case "Standard":
            value = nft.asset_contract.schema_name;
            break;
          case "执行标准":
            value = nft.asset_contract.schema_name;
            break;
          case "Daily price[per day][eth]":
            value = nft.dailyRentPrice;
            break;
          case "租金（eth/天）":
            value = nft.dailyRentPrice;
            break;
          case "Max duration [days]":
            value = nft.duration;
            break;
          case "最长租期 (天)":
            value = nft.duration;
            break;
          case "Collateral [per item][eth]":
            value = nft.collateral;
            break;
          case "缴纳抵押金（eth）":
            value = nft.collateral;
            break;
          default:
            break;
        }
        dom = document.getElementById(`${nft.token_id}-${index}`);
        if (dom) {
          dom.innerHTML = value;
          if (index == 0) {
            dom.href = value;
          }
        }
      } catch (error) {
        console.log(`${nft.token_id}-${index}`, dom, nft, value, meta, error);
      }
    },
  },
};
</script>
