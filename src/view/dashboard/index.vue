<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
  >
    <div class="content__row content__items">
      <div
        v-for="(nft, index) of myListNfts"
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
            <span v-else :id="nft.token_id + '-' + key"
              >{{ getContentRow(nft, meta, key) }}
            </span>
          </div>
        </div>

        <div class="nft__control">
          <button
            v-if="dashboardToggleValue === 0"
            class="nft__button"
            type="button"
            @click="handleRepay(nft)"
          >
            {{ languagePackage.repay }}
          </button>
          <div v-else-if="nft.isInPool">
            <button
              style="margin-right:10px"
              class="nft__button"
              type="button"
              @click="handleWithdraw(nft)"
            >
              {{ languagePackage.inPoolWithdrw }}
            </button>
            <button
              class="nft__button"
              type="button"
              @click="handleUpdate(nft)"
            >
              {{ languagePackage.inPoolUpdate }}
            </button>
          </div>
          <button
            v-else-if="!nft.isInPool"
            class="nft__button"
            type="button"
            @click="handleClaim(nft)"
          >
            {{ languagePackage.claim }}
          </button>
        </div>
      </div>
    </div>
    <div
      class="content__nonfts center"
      v-if="myListNfts.length == 0 && accounts && accounts[0]"
    >
      抱歉当前网络下的账户没有请求到可以租出的NFT
    </div>
  </div>
</template>

<script>
//拿用户托管给给平台的所有token
//请求卡片基本信息和租赁信息
//批量判断是否已经被租了

import dic from "@/model/counten.json";
import { contactPP } from "@/api/contact.js";
import { mapGetters, mapMutations } from "vuex";
import languageMixin from "@/mixins/language";
import { contactPP_signer } from "../../api/contact";
import { ElMessage } from "element-plus";

export default {
  name: "dashboard",
  mixins: [languageMixin],
  data() {
    return {
      myListNfts: [],
      metas:
        this.language == "zh"
          ? [
              "合约地址",
              "NFT编号",
              "执行标准",
              "租金（eth/天）",
              "最长租期 (天)",
              "缴纳抵押金（eth）",
            ]
          : [
              "Address",
              "Token id",
              "Standard",
              "Daily price[per day][eth]",
              "Max duration [days]",
              "Collateral [per item][eth]",
            ],
      loading: false,
    };
  },
  computed: {
    ...mapGetters([
      "accounts",
      "repaidNFT",
      "dashboardToggleValue",
      "keywords",
    ]),
  },
  watch: {
    repaidNFT(val) {
      this.deleteNFT(val);
    },
    accounts(val) {
      if (val && val[0]) {
        this.getRented();
      }
    },
    dashboardToggleValue(val) {
      if (val == 0) {
        this.myListNfts = this.myListNftsRend.slice();
      } else {
        this.myListNfts = [];
        this.getLended();
      }
    },
    "$route.name"(val) {
      if (val == "dashboard") {
        this.getLended();
      } else {
        this.myListNfts = this.myListNftsRend.slice();
      }
    },
    keywords(val) {
      if (!val) {
        if (this.dashboardToggleValue == 0) {
          this.myListNfts = this.myListNftsRend.slice();
        } else {
          this.myListNfts = this.myListNftsLent.slice();
        }
      } else {
        if (this.dashboardToggleValue == 0) {
          this.myListNfts = this.myListNftsRend.filter(
            (r) => r.token_id == val || r.name.indexOf(val) > -1
          );
        } else {
          this.myListNfts = this.myListNftsLent.filter(
            (r) => r.token_id == val || r.name.indexOf(val) > -1
          );
        }
      }
    },
  },
  beforeMount() {
    if (this.accounts && this.accounts[0]) {
      this.getRented();
    }
  },
  methods: {
    ...mapMutations(["setSelectedNftRepay", "setSelectedNftLendToEdit"]),
    //获取账户租入的nfts
    async getRented() {
      this.loading = true;
      try {
        //所有托管在平台的
        let allTokenList = await contactPP.getTokenList(
          process.env.VUE_APP_ERC721_ADDRESS
        );
        let nftsIdList = allTokenList.map((nft) => {
          return nft.toString();
        });
        console.log(nftsIdList);
        let arrIsInPool = await contactPP.checkPool(
          process.env.VUE_APP_ERC721_ADDRESS,
          nftsIdList
        );
        //取不在池子里的，代表租出去了
        let idsFromContact = [];
        arrIsInPool.forEach((value, index) => {
          value ? "" : idsFromContact.push(nftsIdList[index]);
        });
        // owner=${this.accounts[0]}&
        let url = `${process.env.VUE_APP_OPENSEA}?asset_contract_address=${process.env.VUE_APP_ERC721_ADDRESS}&order_direction=desc&offset=0&collection=rivermen`; //&collection=rivermen
        //用户地址opensea的，包含他租了的
        let idsFromOpensea = [];
        fetch(url, { method: "GET" })
          .then((re) => re.json())
          .then(async (res) => {
            //交集即当前账户已经租入的nft
            idsFromOpensea = res.assets.map((a) => {
              return a.token_id;
            });
            let intersection = idsFromOpensea.filter((item) =>
              idsFromContact.includes(item)
            );
            let intersectionNFTS = res.assets.filter((n) =>
              intersection.includes(n.token_id)
            );
            console.log(intersectionNFTS);
            this.myListNftsRend = intersectionNFTS.slice();
            this.myListNfts = this.myListNftsRend;
            this.getLendValue(this.myListNfts.slice());
            this.loading = false;
          });
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    //获取账户租出去的nfts
    async getLended() {
      if (this.myListNftsLent) {
        this.myListNfts = this.myListNftsLent.slice();
      } else {
        this.loading = true;
        try {
          //根据在不在池子里，判断有没有被人租走
          let userTokenList = await contactPP.getTokenListOfUser(
            process.env.VUE_APP_ERC721_ADDRESS,
            this.accounts[0]
          );
          let nftsIdList = userTokenList.map((nft) => {
            return nft.toString();
          });
          let arrIsInPool = await contactPP.checkPool(
            process.env.VUE_APP_ERC721_ADDRESS,
            nftsIdList
          );
          let idsInPool = []; //取在池子里的，在池子里就是还没被租走，可以更新租赁信息和撤销
          let idsOutOfPool = []; //不在池子里的如果大于0，就是别人租了超时没还的，都可以claim
          //不在在池子里等于0，就是别人租了的已经还到池子了，自然看不到了
          arrIsInPool.forEach((value, index) => {
            value
              ? idsInPool.push(nftsIdList[index])
              : idsOutOfPool.push(nftsIdList[index]);
          });
          this.arrInPool = await this.getNtfInfo(idsInPool, true);
          this.arrOutOfPool = await this.getNtfInfo(idsOutOfPool, false);
          console.log(this.arrInPool);
          console.log(this.arrOutOfPool);
          this.myListNftsLent = this.arrInPool.concat(this.arrOutOfPool);
          this.myListNfts = this.myListNftsLent;
          this.getLendValue(this.myListNfts.slice());
          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    },
    //根据id异步去opensea拿数据,做展示
    //type true=在池子里
    async getNtfInfo(ids, type) {
      let tempAssets = [];
      try {
        let token_ids = "token_ids=" + ids.join("&token_ids=");
        //测试网
        let url = `${process.env.VUE_APP_OPENSEA}?${token_ids}&order_direction=desc&offset=0&limit=${ids.length}&collection=rivermen`; //&collection=rivermen
        //主网得加上河里人进行过滤
        // let url = `${process.env.VUE_APP_MAINFEST}?${token_ids}&asset_contract_address=${process.env.VUE_APP_RIVERMEN_ADDRESS}&order_direction=desc&offset=0&limit=${tIds.length}`;
        let res = await fetch(url, { method: "GET" })
          .then((response) => response.json())
          .then((res) => {
            return res;
          });
        if (res && typeof res.assets == "object") {
          //opensea对象结构数据，只拿当前账户的 ????
          // let tempAssets = res.assets.filter(
          //   (n) => n.owner.address == vm.accounts[0]
          // );
          tempAssets = res.assets; //接口拿不到owner数据，暂且先出货 ，假设拿到了用户传进来的tokens信息
          tempAssets.forEach((a) => {
            a.isInPool = type;
          });
        }
      } catch (error) {
        console.log(error);
      }
      return tempAssets;
    },
    async getLendValue(arrayOpenseaNft) {
      arrayOpenseaNft.forEach(async (n) => {
        let lendingValue = await contactPP.LendingPool(
          process.env.VUE_APP_ERC721_ADDRESS, // 河里人合约地址
          n.token_id
        );
        n.startAt = lendingValue.startAt.toString();
        n.dailyRentPrice = parseInt(lendingValue.price.toString()) / 1e18;
        n.duration = parseFloat(lendingValue.duration.toString()) / (3600 * 24);
        n.collateral = parseInt(lendingValue.collateral.toString()) / 1e18;
      });
      this.myListNfts = arrayOpenseaNft.slice();
      this.loading = false;
    },
    //更新nft租赁信息
    async handleUpdate(nft) {
      this.selectedToRent = [
        {
          token_id: nft.token_id,
          dailyRentPrice: 0,
          duration: 0,
          collateral: 0,
        },
      ];
      //拿所有出租数据，避免又去请求
      let dom1 = document.getElementById(`${nft.token_id}-3`);
      let dom2 = document.getElementById(`${nft.token_id}-4`);
      let dom3 = document.getElementById(`${nft.token_id}-5`);
      this.selectedToRent[0].dailyRentPrice = dom1 ? dom1.innerHTML : 0;
      this.selectedToRent[0].duration = dom2 ? dom2.innerHTML : 0;
      this.selectedToRent[0].collateral = dom3 ? dom3.innerHTML : 0;

      console.log(this.selectedToRent);
      this.setSelectedNftLendToEdit(this.selectedToRent[0]);
    },
    //撤销nft租赁信息
    async handleWithdraw(nft) {
      this.$confirm("此操作撤回当前选中的nft, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await contactPP_signer.withdrawToken(
            process.env.VUE_APP_ERC721_ADDRESS,
            nft.token_id
          );
          console.log(res);
          this.deleteNFT(nft.token_id);
          ElMessage({
            type: "success",
            message: "撤销成功!",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteNFT(id) {
      let index = this.myListNfts.findIndex((n) => n.token_id == id);
      if (index > -1) {
        this.myListNfts.splice(index, 1);
      }
    },
    //申请nft超时补偿
    async handleClaim(nft) {
      this.$confirm("此操作认领超时补偿金, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let repayResult = await contactPP_signer.claim(
            process.env.VUE_APP_ERC721_ADDRESS, // 河里人合约地址
            nft.token_id // 每个河里人对应的tokenID
          );
          console.log(repayResult);
          this.deleteNFT(nft.token_id);
          ElMessage({
            type: "success",
            message: "撤销成功!",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //主动归还
    async handleRepay(nft) {
      this.setSelectedNftRepay([nft]);
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

<style lang="scss" scoped></style>
