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
    <div className="content-wrapper main-content mb-l">{{children}}</div>
    <Footer />
  </div>
</template>

<script>
/*
   功能模块  layout
   创建人    fc
   更新时间  2021/08/30
   备注
*/
import MainHeader from "@/components/home/MainHeader.vue";
import MainMenu from "@/components/home/MainMenu.vue";
import SearchMenu from "@/components/home/SearchMenu.vue";
import DevMenu from "@/components/home/DevMenu.vue";
import Footer from "@/components/home/Footer.vue";

export default {
  name: "Layout",
  components: {
    MainHeader,
    MainMenu,
    SearchMenu,
    DevMenu,
    Footer,
  },
  computed: {},
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  methods: {},
};
</script>
