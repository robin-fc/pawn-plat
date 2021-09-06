<template>
  <div class="routeMenu">
    <router-link
      v-for="route of menueRoutes"
      :key="route.path"
      :to="route.path"
      :className="`routeMenu__item ${
        $route.name == route.name ? 'routeMenu__item-active' : ''
      }`"
    >
      {{ languagePackage[route.name] }}
    </router-link>
  </div>
</template>

<script>
import languageMixin from "@/mixins/language";
const ROUTES = [
  {
    path: "/rent",
    name: "rent",
  },
  {
    path: "/lend",
    name: "lend",
  },
  {
    path: "/dashboard",
    name: "dashboard",
  },
  {
    path: "/faq",
    name: "faq",
  },
];

export default {
  mixins: [languageMixin],
  data() {
    return { isActive: false };
  },
  beforeCreate() {
    this.menueRoutes = ROUTES.slice();
  },
  mounted() {},
  methods: {},
};
</script>

<style lang='less' scoped></style>