<template>
  <div>
    <div id="slogan" class="text-center">
      <h1>NameGator</h1>
      <br />
      <h6 class="text-secondary">
        Name generator using Vue.js, GraphQL and Node
      </h6>
    </div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
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
                    {{ prefix }}
                  </li>
                </ul>
                <br />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter the prefix"
                />
              </div>
            </div>
          </div>
          <div class="col-md">
            <h5>
              Sulfixes <span class="badge bg-info">{{ sulfixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="(sulfix, index) in sulfixes"
                    :key="index"
                  >
                    {{ sulfix }}
                  </li>
                </ul>
                <br />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter the sulfix"
                />
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
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(domain, index) in domains"
                :key="index"
              >
                {{ domain }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// reactive state
const prefixes = ref(["Air", "Jet", "Flight"]);
const sulfixes = ref(["Hub", "Station", "Mart"]);
const domains = ref([
  "AirHub",
  "AirStation",
  "AirMart",
  "JetHub",
  "JetStation",
  "JetMart",
  "FlightHub",
  "FlightStation",
  "FlightMart",
]);
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
