<template>
  <div class="app-container">
    <div className="content-wrapper mb-l">
      <HomeHeader />
    </div>
    <div className="content-wrapper mb-l menu-wrapper">
      <HomeMenu />
      <SearchTool />
    </div>
    <MainMenu />
    <div className="content-wrapper main-content mb-l">
      <div class="content">
        <Toggle />
        <router-view />
      </div>
    </div>
    <HomeFooter />
    <LendDialog />
  </div>
</template>

<script>
/*
   功能模块  layout
   创建人    fc
   更新时间  2021/08/30
   备注
*/
import HomeHeader from "@/components/home/homeHeader.vue";
import HomeMenu from "@/components/home/homeMenu.vue";
import SearchTool from "@/components/home/searchTool.vue";
import MainMenu from "@/components/home/mainMenu.vue";
import HomeFooter from "@/components/home/homeFooter.vue";
import Toggle from "@/components/public/toggle.vue";
import LendDialog from "@/components/public/lendDialog.vue";
import { mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
    HomeHeader,
    HomeMenu,
    SearchTool,
    MainMenu,
    HomeFooter,
    Toggle,
    LendDialog,
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
};
</script>
