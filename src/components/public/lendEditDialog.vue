<template>
  <el-dialog
    title="出租信息修改"
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
      <el-form-item label="合约地址" prop="address">
        {{ ruleForm.address }}
      </el-form-item>
      <el-form-item label="NFT编号" prop="tokenId">
        {{ ruleForm.tokenId }}
      </el-form-item>
      <el-form-item label="租金（eth/天）" prop="price">
        <el-input-number
          v-model="ruleForm.price"
          :precision="2"
          :step="0.01"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="租期 (天)" prop="duration">
        <el-input-number
          v-model="ruleForm.duration"
          :precision="1"
          :step="0.5"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="缴纳抵押金（eth）" prop="collateral">
        <el-input-number
          v-model="ruleForm.collateral"
          :precision="2"
          :step="0.01"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <div class="modal-dialog-button">
          <div class="nft__control"> 
            <button class="nft__button" type="button" @click="handleClaim">
              {{ languagePackage.claim }}
            </button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { ethers } from "ethers"; //, providers
import { contactRivermen_signer, contactPP_signer } from "@/api/contact";
import { mapGetters, mapMutations } from "vuex";
import { ElMessage } from "element-plus";
/**
 * 出租后的撤销、更新、claim功能
 */
export default {
  name: "lendEditDialog",
  data() {
    const validateDuration = function(rule, val, callback) {
      let reg = /^\d+(\.\d+)?$/;
      if (reg.test(val)) {
        if (val <= 0 || val % 0.5 != 0) {
          return callback(new Error("请填写0.5天为间隔,正整数倍的数据"));
        } else {
          callback();
        }
      } else {
        return callback(new Error("请填写0.5天为间隔,正整数倍的数据"));
      }
    };
    const validatePrice = function(rule, val, callback) {
      let reg = /^\d+(\.\d+)?$/;
      if (reg.test(val)) {
        if (val <= 0) {
          return callback(new Error("请填写大于0的租金以保障您的权益"));
        } else {
          callback();
        }
      } else {
        return callback(new Error("请检查拼写"));
      }
    };
    const validateCollateral = function(rule, val, callback) {
      let reg = /^\d+(\.\d+)?$/;
      if (reg.test(val)) {
        if (val <= 0) {
          return callback(new Error("请填写大于0的抵押金以保障您的权益"));
        } else {
          callback();
        }
      } else {
        return callback(new Error("请检查拼写"));
      }
    };
    return {
      isShow: false,
      ruleForm: {
        address: process.env.VUE_APP_ERC721_ADDRESS,
        tokenId: "",
        price: 0,
        duration: 0,
        collateral: 0,
      },
      rules: {
        address: [{ required: true }],
        tokenId: [{ required: true }],
        price: [
          {
            validator: validatePrice,
            required: true,
            trigger: "change",
          },
        ],
        duration: [
          {
            validator: validateDuration,
            required: true,
            trigger: "change",
          },
        ],
        collateral: [
          {
            validator: validateCollateral,
            required: true,
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["selectedNftLendToEdit"]),
  },
  watch: {
    selectedNftLendToEdit(val) {
      if (val[0]) {
        this.ruleForm.tokenId = val[0].token_id;
        this.isShow = true;
      } else {
        this.ruleForm.tokenId = "";
        this.isShow = false;
      }
    },
  },
  mounted() {
    console.log(process.env.VUE_APP_ERC721_ADDRESS);
    console.log(this.selectedNftLendToEdit[0]);
    if (this.selectedNftLendToEdit[0]) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  },
  methods: {
    ...mapMutations(["setSelectedNftLendToEdit"]),
    //关闭当前对话框
    handleClose() {
      this.$refs["ruleForm"].resetFields();
      this.setSelectedNftLendToEdit([]);
    },
    //表单前端校验
    handleValid() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.handleApprove();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //ether.js通过rivermen合约向租赁合约授权
    async handleApprove() {
      await contactRivermen_signer.setApprovalForAll(
        process.env.VUE_APP_PAWNPLAT_ADDRESS,
        true
      );
      this.handleUpdateLend();
    },
    //调用租赁合约的lend函数更新挂单信息
    async handleUpdateLend() {
      let price = ethers.utils
        .parseEther(this.ruleForm.price.toString())
        .toHexString();
      let duration = (this.ruleForm.duration * 24 * 3600).toString();
      let collateral = ethers.utils
        .parseEther(this.ruleForm.collateral.toString())
        .toHexString();
      if (this.ruleForm.tokenId) {
        try {
          let nfts = await contactPP_signer.lend(
            process.env.VUE_APP_ERC721_ADDRESS, // 河里人合约地址
            this.ruleForm.tokenId, // 每个河里人对应的tokenID
            price, // 设置租金/day
            duration, // 租期 单位为秒
            collateral // 抵押金 eth
          );
          console.log(nfts, this.ruleForm.tokenId);
          this.setLendUpdated(this.ruleForm.tokenId.toString());
          this.handleClose();
        } catch (error) {
          ElMessage(error);
        }
      } else {
        ElMessage("tokenId缺失");
      }
    },
    handleWithdraw() {},
    handleClaim() {},
  },
};
</script>

<style lang="less" scoped></style>
