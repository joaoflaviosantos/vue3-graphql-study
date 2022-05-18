<template>
  <div id="main-app">
    <AppNav />
    <!--<AppSlogan />-->
    <AppDomainList class="mb-5" />
    <AppFooter />
  </div>
</template>

<script setup>
import AppDomainList from "./components/AppDomainList.vue";
import AppNav from "./components/AppNav.vue";
import AppFooter from "./components/AppFooter.vue";
//import AppSlogan from "./components/AppSlogan.vue";

// https://financeiro.hostgator.com.br/api/v2/shop/br/domains/availability/com.br/airstation
</script>

<style>
#slogan {
  margin-top: 20px;
  margin-bottom: 20px;
}
#main {
  padding-top: 20px;
  padding-bottom: 15px;
}

#main-app {
  background-color: #f1f1f1;
}
</style>
