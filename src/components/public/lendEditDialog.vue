<template>
  <el-dialog
    :title="languagePackage.lendEdit"
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
      <el-form-item :label="languagePackage.dailyRentPrice" prop="price">
        <el-input-number
          v-model="ruleForm.price"
          :precision="2"
          :step="0.01"
        ></el-input-number>
      </el-form-item>
      <el-form-item :label="languagePackage.duration" prop="duration">
        <el-input-number
          v-model="ruleForm.duration"
          :precision="1"
          :step="0.5"
        ></el-input-number>
      </el-form-item>
      <el-form-item :label="languagePackage.collateral" prop="collateral">
        <el-input-number
          v-model="ruleForm.collateral"
          :precision="2"
          :step="0.01"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <div class="modal-dialog-button">
          <div class="nft__control">
            <button class="nft__button" type="button" @click="handleUpdateLend">
              {{ languagePackage.inPoolUpdate }}
            </button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { ethers } from "ethers"; //, providers
import { contactPP_signer } from "@/api/contact";
import { mapGetters, mapMutations } from "vuex";
import { ElMessage } from "element-plus";
import languageMixin from "@/mixins/language";

/**
 * 出租后的撤销、更新、claim功能
 */
export default {
  name: "lendEditDialog",
  mixins: [languageMixin],
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
      this.dealNftChange(val);
    },
  },
  mounted() {
    this.dealNftChange(this.selectedNftLendToEdit);
  },
  methods: {
    ...mapMutations(["setSelectedNftLendToEdit"]),
    dealNftChange(nft) {
      if (nft && nft.token_id) {
        this.ruleForm.tokenId = nft.token_id;
        this.ruleForm.price = parseFloat(nft.dailyRentPrice);
        this.ruleForm.duration = parseFloat(nft.duration);
        this.ruleForm.collateral = parseFloat(nft.collateral);
        this.isShow = true;
      } else {
        this.ruleForm.tokenId = "";
        this.ruleForm.price = 0;
        this.ruleForm.duration = 0;
        this.ruleForm.collateral = 0;
        this.isShow = false;
      }
    },
    //关闭当前对话框
    handleClose() {
      this.$refs["ruleForm"].resetFields();
      this.setSelectedNftLendToEdit([]);
    },
    //表单前端校验
    handleValid() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.handleUpdateLend();
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
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
          await contactPP_signer.updateLendingInfo(
            process.env.VUE_APP_ERC721_ADDRESS, // 河里人合约地址
            this.ruleForm.tokenId, // 每个河里人对应的tokenID
            price, // 设置租金/day
            duration, // 租期 单位为秒
            collateral // 抵押金 eth
          );
          // console.log(nfts, this.ruleForm.tokenId);
          this.setLendUpdated(this.ruleForm.tokenId.toString());
          this.handleClose();
        } catch (error) {
          ElMessage(error);
        }
      } else {
        ElMessage("tokenId缺失");
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
