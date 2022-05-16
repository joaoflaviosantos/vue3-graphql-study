<template>
  <div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md my-1">
            <AppItemList
              title="Prefixes"
              :singularItem="singularPrefixes"
              :items="prefixes"
              @addItem="addPrefix"
              @deleteItem="deletePrefix"
            />
          </div>
          <div class="col-md my-1">
            <AppItemList
              title="Suffixes"
              :singularItem="singularSuffixes"
              :items="suffixes"
              @addItem="addSuffix"
              @deleteItem="deleteSuffix"
            />
          </div>
        </div>
        <br />
        <div>
          <h5>
            Domains <span class="badge bg-info">{{ domains.length }}</span>
          </h5>
          <div class="card" style="min-height: 18rem">
            <div class="card-body">
              <ul class="list-group" v-if="domains.length == 0">
                <li class="list-group-item list-group-item-danger">
                  Please enter at least one prefix and a suffix to view the
                  suggestions for domain names
                </li>
              </ul>
              <ul class="list-group">
                <li
                  class="list-group-item"
                  v-for="(domain, index) in domains"
                  :key="index"
                >
                  <div class="row">
                    <div class="col-md">
                      {{ domain.name }}
                    </div>
                    <!-- https://stackoverflow.com/a/67257313/15876118 -->
                    <div class="col-md float-end text-end">
                      <a
                        class="btn btn-success btn-sm opacity-75"
                        :href="domain.checkout"
                        target="_blank"
                      >
                        <span class="text-white fa fa-shopping-cart"></span>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AppItemList from "./AppItemList.vue";

// reactive state
const prefixes = ref(["Air", "Jet", "Flight"]);
const singularPrefixes = ref("prefix");
const suffixes = ref(["Hub", "Station", "Mart"]);
const singularSuffixes = ref("suffix");

// reactive computed state
const domains = computed(() => {
  const domainslist = [];
  for (const p of prefixes.value) {
    for (const s of suffixes.value) {
      const name = p + s;
      const checkout = `https://cart.hostgator.com.br/?pid=d&sld=${name.toLocaleLowerCase()}&tld=.com.br`;
      domainslist.push({
        name,
        checkout,
      });
    }
  }
  return domainslist;
});

// methods
const addPrefix = async (iprefix) => {
  if (iprefix != null && iprefix != "" && !prefixes.value.includes(iprefix)) {
    try {
      await prefixes.value.push(iprefix);
    } catch (error) {
      alert(error);
    }
  }
};

const deletePrefix = async (iprefix) => {
  if (prefixes.value.includes(iprefix)) {
    try {
      await prefixes.value.splice(prefixes.value.indexOf(iprefix), 1);
    } catch (error) {
      alert(error);
    }
  }
};

const addSuffix = async (isuffix) => {
  if (isuffix != null && isuffix != "" && !suffixes.value.includes(isuffix)) {
    try {
      await suffixes.value.push(isuffix);
    } catch (error) {
      alert(error);
    }
  }
};

const deleteSuffix = async (isuffix) => {
  if (suffixes.value.includes(isuffix)) {
    try {
      await suffixes.value.splice(suffixes.value.indexOf(isuffix), 1);
    } catch (error) {
      alert(error);
    }
  }
};
// https://financeiro.hostgator.com.br/api/v2/shop/br/domains/availability/com.br/airstation
</script>

<style scoped></style>
