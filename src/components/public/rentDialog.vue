<template>
  <el-dialog
    title="确认信息"
    v-model="isShow"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="180px"
      class="demo-ruleForm"
    >
      <el-form-item :label="languagePackage.address" prop="address">
        {{ ruleForm.address }}
      </el-form-item>
      <el-form-item :label="languagePackage.tokenId" prop="tokenId">
        {{ ruleForm.tokenId }}
      </el-form-item>
      <el-form-item
        :label="languagePackage.dailyRentPrice"
        prop="dailyRentPrice"
      >
        {{ ruleForm.dailyRentPrice }}
      </el-form-item>
      <el-form-item :label="languagePackage.duration" prop="duration">
        {{ ruleForm.duration }}
      </el-form-item>
      <el-form-item :label="languagePackage.collateral" prop="collateral">
        {{ ruleForm.collateral }}
      </el-form-item>
      <!-- <el-form-item :label="languagePackage.totalRentPrice" prop="total">
        {{ ruleForm.totalRentPrice }}
      </el-form-item> -->
      <el-form-item>
        <div class="modal-dialog-button">
          <div class="nft__control">
            <button class="nft__button" type="button" @click="handleValid">
              {{ languagePackage.approvePaymentTokens }}
            </button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { ethers } from "ethers";
import { contactPP_signer } from "@/api/contact.js";
import { mapGetters, mapMutations } from "vuex";
import { ElMessage } from "element-plus";
import languageMixin from "@/mixins/language";

export default {
  mixins: [languageMixin],
  data() {
    return {
      isShow: false,
      ruleForm: {
        address: process.env.VUE_APP_ERC721_ADDRESS,
        tokenId: "",
        dailyRentPrice: 0,
        duration: 0,
        collateral: 0,
      },
      rules: {
        address: [{ required: true }],
        tokenId: [{ required: true }],
        duration: [{ required: true }],
      },
    };
  },
  computed: {
    ...mapGetters(["selectedNftRent"]),
  },
  watch: {
    selectedNftRent(val) {
      if (val[0]) {
        console.log(val[0]);
        this.ruleForm.tokenId = val[0].token_id;
        this.ruleForm.duration = val[0].duration;
        this.ruleForm.dailyRentPrice = val[0].dailyRentPrice;
        this.ruleForm.collateral = val[0].collateral;
        // this.getLendInfo(this.ruleForm.tokenId);
        this.isShow = true;
      } else {
        this.ruleForm.tokenId = "";
        this.isShow = false;
      }
    },
  },
  mounted() {
    if (this.selectedNftRent[0]) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  },
  methods: {
    ...mapMutations(["setSelectedNftRent", "setRentedNFT"]),
    handleCountTotal() {
      this.ruleForm.totalRentPrice =
        this.ruleForm.dailyRentPrice * this.ruleForm.duration +
        parseFloat(this.ruleForm.collateral);
      let s = ethers.utils
        .parseEther(this.ruleForm.totalRentPrice.toString())
        .toHexString();
      console.log(this.ruleForm.totalRentPrice.toString());
      return s;
    },
    //关闭当前对话框
    handleClose() {
      this.$refs["ruleForm"].resetFields();
      this.setSelectedNftRent([]);
    },
    //表单前端校验
    handleValid() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.handleRent();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //ether.js通过rivermen合约向租赁合约授权
    // async handleApprove() {
    //   await contactRivermen_signer.setApprovalForAll(
    //     process.env.VUE_APP_PAWNPLAT_ADDRESS,
    //     true
    //   );
    //   this.handleRent();
    // },
    //调用租赁合约的rent函数进行租赁，租赁合约签单
    async handleRent() {
      let totalRentPrice = this.handleCountTotal();
      if (this.ruleForm.tokenId) {
        try {
          let nfts = await contactPP_signer.rent(
            process.env.VUE_APP_ERC721_ADDRESS, // 河里人合约地址
            this.ruleForm.tokenId, // 每个河里人对应的tokenID
            {
              value: totalRentPrice,
            }
          );
          console.log(nfts);
          this.setRentedNFT(this.ruleForm.tokenId.toString());
          this.handleClose();
        } catch (error) {
          console.log(error);
          ElMessage(error);
        }
      } else {
        ElMessage("tokenId缺失");
      }
    },
    // async getLendInfo(id) {
    //   let provider = {
    //     current: new ethers.providers.Web3Provider(window.ethereum, "any"),
    //   };
    //   let contactPP = new ethers.Contract(
    //     process.env.VUE_APP_PAWNPLAT_ADDRESS,
    //     PawnPlatabi,
    //     provider.current
    //   );
    //   console.log(contactPP);
    //   let cardInfo = await contactPP.getLendingValue(
    //     process.env.VUE_APP_ERC721_ADDRESS,
    //     id
    //   );
    //   console.log(cardInfo);
    // },
  },
};
</script>

<style lang="less" scoped></style>
