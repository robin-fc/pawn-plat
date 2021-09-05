<template>
  <div class="routeMenu">
    <a
      v-for="route of menueRoutes"
      :key="route.path"
      :href="route.path"
      :className="`routeMenu__item ${
        $route.name == route.name ? 'routeMenu__item-active' : ''
      }`"
    >
      {{ languagePackage[route.name] }}
    </a>
  </div>
</template>

<script>
import languageMixin from "@/mixins/language";
const ROUTES = [
  {
    path: "/",
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