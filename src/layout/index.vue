<template>
  <div class="app-container">
    <div className="content-wrapper mb-l">
      <MainHeader />
    </div>
    <div className="content-wrapper mb-l menu-wrapper">
      <MainMenu />
      <SearchMenu />
    </div>
    <DevMenu />
    <div className="content-wrapper main-content mb-l">
      <div class="content">
        <Toggle />
        <router-view />
      </div>
    </div>
    <Footer />
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
import MainHeader from "@/components/home/mainHeader.vue";
import MainMenu from "@/components/home/mainMenu.vue";
import SearchMenu from "@/components/home/searchMenu.vue";
import DevMenu from "@/components/home/devMenu.vue";
import Footer from "@/components/home/footer.vue";
import Toggle from "@/components/public/toggle.vue";
import LendDialog from "@/components/public/lendDialog.vue";
import { mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
    MainHeader,
    MainMenu,
    SearchMenu,
    DevMenu,
    Footer,
    Toggle,
    LendDialog,
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
};
</script>
