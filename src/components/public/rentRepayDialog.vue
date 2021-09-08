<template>
  <el-dialog
    title="即将归还"
    v-model="isShow"
    width="30%"
    :before-close="handleClose"
  >
    <section v-if="!exceedDutation">
      <div>NAME： {{ nft.name }}</div>
      <div style="padding-left:1.5rem">ID：{{ nft.token_id }}</div>
      <img :src="nft.image_url" alt="" />
    </section>
    <div class="modal-dialog-button">
      <div class="nft__control">
        <button
          :class="exceedDutation ? 'nft__button disabled' : 'nft__button'"
          :disabled="exceedDutation"
          type="button"
          @click="handleApprove"
        >
          {{ exceedDutation ? "超时" : languagePackage.repay }}
        </button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { contactPP_signer, contactRivermen_signer } from "@/api/contact.js";
import { mapGetters, mapMutations } from "vuex";
import { ElMessage } from "element-plus";
import languageMixin from "@/mixins/language";
/**
 * @description: 主动归还
 * @author:fc
 */
export default {
  name: "repay",
  mixins: [languageMixin],
  data() {
    return {
      isShow: false,
      nft: { token_id: "", image_url: "" },
      exceedDutation: false,
    };
  },
  computed: {
    ...mapGetters(["selectedNftRepay"]),
  },
  watch: {
    selectedNftRepay(val) {
      this.dealChange(val[0]);
    },
  },
  mounted() {
    this.dealChange(this.selectedNftRepay[0]);
  },
  methods: {
    ...mapMutations(["setSelectedNftRepay", "setRepaidNFT"]),
    //关闭当前对话框
    handleClose() {
      this.setSelectedNftRepay([]);
    },
    //ether.js通过rivermen合约向租赁合约授权
    async handleApprove() {
      await contactRivermen_signer.setApprovalForAll(
        process.env.VUE_APP_PAWNPLAT_ADDRESS,
        true
      );
      this.handleRepay();
    },
    //调用租赁合约的rent函数进行归还
    async handleRepay() {
      try {
        let repayResult = await contactPP_signer.repay(
          process.env.VUE_APP_ERC721_ADDRESS, // 河里人合约地址
          this.selectedNftRepay[0].token_id // 每个河里人对应的tokenID
        );
        console.log(repayResult);
        this.setRepaidNFT(this.selectedNftRepay[0].token_id);
        this.handleClose();
      } catch (error) {
        console.log(error.message ? error.message : error);
        if (error && error.code == "-32603") ElMessage(error.message);
      }
    },
    dealChange(val) {
      if (val) {
        this.nft = val;
        this.exceedDutation =
          parseInt(val.startAt * 1000) + val.duration * 1000 * 3600 * 24 <=
          new Date().getTime();
        this.isShow = true;
      } else {
        this.nft = { token_id: "", image_url: "" };
        this.exceedDutation = false;
        this.isShow = false;
      }
    },
  },
};
</script>
