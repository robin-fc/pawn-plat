<template>
  <div class="menu__item">
    <el-select
      v-model="value"
      :placeholder="languagePackage.nftSortPlaceholder"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
//import PageHeaderLayout from '@/layouts/PageHeaderLayout'
//import { mapGetters } from 'vuex'
import languageMixin from "@/mixins/language";

export default {
  //  components: {
  //    PageHeaderLayout,
  //  },
  mixins: [languageMixin],

  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      value: "",
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  //  computed: {
  //   ...mapGetters(['userPermissions','buttonType'])
  // },
  // 监控data中的数据变化
  //watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  // created() {}
  // beforeMount() {}, // 生命周期 - 挂载之前
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //beforeDestroy() {}, // 生命周期 - 销毁之前
  // 方法集合
  methods: {},
};
</script>

<style lang='less' scoped></style>