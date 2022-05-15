<template>
  <div>
    <!--<nav class="p-3 navbar navbar-expand-lg navbar-dark bg-success" style="--bs-bg-opacity: .85;background-color: rgba(var(--bs-success-rgb), var(--bs-bg-opacity)) !important;">-->
    <nav class="p-3 navbar navbar-expand-lg navbar-dark bg-dark bg-gradient">
      <div class="container-fluid">
        <a class="navbar-brand mb-0 h1" href="#">
          <img
            src="@/assets/logo_hostgator.svg"
            alt=""
            width="40"
            height="40"
            class="d-inline-block"
          />
          NameGator
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <ModalLink />
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div id="slogan" class="p-2 text-center">
      <h1>NameGator</h1>
      <br />
      <h6 class="text-secondary">
        Name generator using Vue.js, GraphQL and Node
      </h6>
    </div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md my-3">
            <h5>
              Prefixes <span class="badge bg-info">{{ prefixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="(prefix, index) in prefixes"
                    :key="index"
                  >
                    <div class="row">
                      <div class="col-md">
                        {{ prefix }}
                      </div>
                      <!-- https://stackoverflow.com/a/67257313/15876118 -->
                      <div class="col-md float-end text-end">
                        <button
                          class="btn btn-secondary btn-sm opacity-50"
                          @click="deletePrefix(prefix)"
                        >
                          <span class="text-white fa fa-trash"></span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
                <br />
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter the prefix"
                    v-model="prefix"
                    @keyup.enter="addPrefix(prefix)"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-info" @click="addPrefix(prefix)">
                      <span class="text-white fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md my-3">
            <h5>
              Suffixes <span class="badge bg-info">{{ suffixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="(suffix, index) in suffixes"
                    :key="index"
                  >
                    <div class="row">
                      <div class="col-md">
                        {{ suffix }}
                      </div>
                      <!-- https://stackoverflow.com/a/67257313/15876118 -->
                      <div class="col-md float-end text-end">
                        <button
                          class="btn btn-secondary btn-sm opacity-50"
                          @click="deleteSulfix(suffix)"
                        >
                          <span class="text-white fa fa-trash"></span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
                <br />
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter the suffix"
                    v-model="suffix"
                    @keyup.enter="addSulfix(suffix)"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-info" @click="addSulfix(suffix)">
                      <span class="text-white fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h5>
          Domains <span class="badge bg-info">{{ domains.length }}</span>
        </h5>
        <div class="card">
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
</template>

<script setup>
import ModalLink from "@/components/ModalLink.vue";
import { ref, computed } from "vue";

// reactive state
const prefix = ref("");
const suffix = ref("");
const prefixes = ref(["Air", "Jet", "Flight"]);
const suffixes = ref(["Hub", "Station", "Mart"]);

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
      prefix.value = "";
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

const addSulfix = async (isuffix) => {
  if (isuffix != null && isuffix != "" && !suffixes.value.includes(isuffix)) {
    try {
      await suffixes.value.push(isuffix);
      suffix.value = "";
    } catch (error) {
      alert(error);
    }
  }
};

const deleteSulfix = async (isuffix) => {
  if (suffixes.value.includes(isuffix)) {
    try {
      await suffixes.value.splice(suffixes.value.indexOf(isuffix), 1);
    } catch (error) {
      alert(error);
    }
  }
};
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
