<template>
  <div class="notFound">路径错误，请检查网址拼写，三秒后跳转到首页</div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  mounted() {
    let route = useRouter();
    setTimeout(() => {
      route.push("/rent");
    }, 3000);
  },
};
</script>

<style lang='less' scoped></style>