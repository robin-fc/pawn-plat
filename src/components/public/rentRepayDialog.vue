<template>
  <el-dialog
    title="确认归还"
    v-model="isShow"
    width="30%"
    :before-close="handleClose"
  >
    <span>即将归还：{{ selectedNftRepay }}</span>
    <div class="modal-dialog-button">
      <div class="nft__control">
        <button class="nft__button" type="button" @click="handleApprove">
          {{ languagePackage.repay }}
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
    };
  },
  computed: {
    ...mapGetters(["selectedNftRepay"]),
  },
  watch: {
    selectedNftRepay(val) {
      console.log(val[0]);
      if (val[0]) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
  mounted() {
    if (this.selectedNftRepay[0]) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
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
          this.selectedNftRepay[0] // 每个河里人对应的tokenID
        );
        console.log(repayResult);
        this.setRepaidNFT(this.selectedNftRepay[0]);
        this.handleClose();
      } catch (error) {
        console.log(error);
        ElMessage(JSON.stringify(error));
      }
    },
  },
};
</script>
