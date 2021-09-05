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
      <el-form-item label="河里人合约地址" prop="address">
        {{ ruleForm.address }}
      </el-form-item>
      <el-form-item label="TokenID" prop="tokenId">
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
            <button class="nft__button" type="button" @click="handleValid">
              确认授权
            </button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { ethers } from "ethers"; //, providers
import { abi as PawnPlatabi } from "@/api/PawnPlat.json";
import { abi as ERC721abi } from "@/api/ERC721.json";
import { mapGetters, mapMutations } from "vuex";

export default {
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
    ...mapGetters(["selectedNftLend"]),
  },
  watch: {
    selectedNftLend(val) {
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
    console.log(this.selectedNftLend[0]);
    if (this.selectedNftLend[0]) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  },
  methods: {
    ...mapMutations(["setSelectedNftLend"]),
    //关闭当前对话框
    handleClose() {
      this.$refs["ruleForm"].resetFields();
      this.setSelectedNftLend([]);
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
      let provider = {
        current: new ethers.providers.Web3Provider(window.ethereum, "any"),
      };
      let contractRivermen = new ethers.Contract(
        process.env.VUE_APP_ERC721_ADDRESS,
        ERC721abi,
        provider.current.getSigner()
      );
      contractRivermen.setApprovalForAll(
        process.env.VUE_APP_PAWNPLAT_ADDRESS,
        true
      );
      this.handleLend(provider);
    },
    //调用租赁合约的lend函数进行租赁，租赁合约保管挂单
    async handleLend(provider) {
      let contractPP = new ethers.Contract(
        process.env.VUE_APP_PAWNPLAT_ADDRESS,
        PawnPlatabi,
        provider.current.getSigner()
      );
      let price = ethers.utils
        .parseEther(this.ruleForm.price.toString())
        .toHexString();
      let duration = (this.ruleForm.duration * 24 * 3600).toString();
      let collateral = ethers.utils
        .parseEther(this.ruleForm.collateral.toString())
        .toHexString();
      console.log(price, duration, collateral, this.ruleForm.token_id);
      if (this.ruleForm.token_id) {
        let nfts = await contractPP.lend(
          process.env.VUE_APP_ERC721_ADDRESS, // 河里人合约地址
          this.ruleForm.token_id, // 每个河里人对应的tokenID
          price, // 设置租金/day
          duration, // 租期 单位为秒
          collateral // 抵押金 eth
        );
        console.log(nfts);
      } else {
        console.log(this.ruleForm.tocken_id); //元素信息缺失
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
