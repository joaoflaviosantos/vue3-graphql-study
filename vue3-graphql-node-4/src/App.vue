<template>
  <div>
    <AppNav />
    <div id="slogan" class="p-2 text-center">
      <h1>NameGator</h1>
      <br />
      <h6 class="text-secondary">
        Name generator using Vue.js, GraphQL and Node
      </h6>
    </div>
    <AppDomainList />
  </div>
</template>

<script setup>
import AppDomainList from "./components/AppDomainList.vue";
import AppNav from "./components/AppNav.vue";

// https://financeiro.hostgator.com.br/api/v2/shop/br/domains/availability/com.br/airstation
</script>

<style>
#slogan {
  margin-top: 30px;
  margin-bottom: 30px;
}
#main {
  background-color: #f1f1f1;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
