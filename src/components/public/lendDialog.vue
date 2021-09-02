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
// import { abi as PawnPlat } from "@/api/PawnPlat.json";
import { abi as ERC721 } from "@/api/ERC721.json";
import { mapGetters, mapMutations } from "vuex";
const PP_CONTRACTADDRESS = "0x39671a4ea0D2eacD3d2E573650d90c423BA87Eb4"; //旧的"0x4A2a34F754A2eEFaa88Ceb6f7262ebE8Cb61d537";
const ERC721_CONTRACTADDRESS = "0x4A2a34F754A2eEFaa88Ceb6f7262ebE8Cb61d537";
export default {
  data() {
    const validateDuration = function (rule, val, callback) {
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
    const validatePrice = function (rule, val, callback) {
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
    const validateCollateral = function (rule, val, callback) {
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
        address: PP_CONTRACTADDRESS,
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
    console.log(this.selectedNftLend[0]);
    if (this.selectedNftLend[0]) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  },
  methods: {
    ...mapMutations(["setSelectedNftLend"]),
    handleClose() {
      this.$refs["ruleForm"].resetFields();
      this.setSelectedNftLend([]);
    },
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
    async handleApprove() {
      //ether.js通过rivermen合约向租赁合约授权
      //   let abi_pp = PawnPlat;
      let abi = ERC721;
      let provider = ethers.getDefaultProvider(); // Connect to the network
      let contractERC = new ethers.Contract(
        ERC721_CONTRACTADDRESS,
        abi,
        provider
      ); 
      // 使用Provider连接合约，将只有对合约的可读权限
      contractERC.setApprovalForAll(PP_CONTRACTADDRESS, true);
      return;
      //   let contractPP = new ethers.Contract(
      //     PP_CONTRACTADDRESS,
      //     abi_pp,
      //     provider
      //   );
      //   let nfts = await contractPP.tokenList(ERC721_CONTRACTADDRESS);
      //   console.log(nfts);
      //调用租赁合约的lend函数进行租赁
    },
  },
};
</script>

<style lang='less' scoped></style>