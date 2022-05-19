<template>
  <div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md my-1">
            <AppItemList
              title="Prefixes"
              type="prefix"
              :items="items.prefix"
              @addItem="addItem"
              @deleteItem="deleteItem"
            />
          </div>
          <div class="col-md my-1">
            <AppItemList
              title="Suffixes"
              type="suffix"
              :items="items.suffix"
              @addItem="addItem"
              @deleteItem="deleteItem"
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
import { ref, computed, onMounted } from "vue";
import AppItemList from "./AppItemList.vue";
import axios from "axios/dist/axios";

// reactive state
/*
const prefix = ref([]);
const suffix = ref([]);
*/
const items = {
  prefix: ref([]),
  suffix: ref([]),
};

// methods
const getItems = async (type) => {
  await axios({
    url: "http://localhost:4000",
    method: "post",
    data: {
      query: `
        query ($type: String) {
          items: items (type: $type) {
            id
            type
            description
          }
        }
      `,
      variables: {
        type: type,
      },
    },
  }).then((response) => {
    const query = response.data;
    items[type].value = query.data.items;
  });
};

const addItem = async (item) => {
  if (
    item != null &&
    item != "" &&
    !items.prefix.value.find((item) => item.description === item) &&
    !items.suffix.value.find((item) => item.description === item)
  ) {
    try {
      //await prefix.value.push(iprefix);
      await axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
        mutation ($item: ItemInput) {
          newItem: saveItem(item: $item) {
            id
            type
            description
          }
        }
      `,
          variables: {
            item,
          },
        },
      }).then((response) => {
        const query = response.data;
        if (query.data.newItem) {
          items[item.type].value.push(query.data.newItem);
        }
      });
    } catch (error) {
      alert(error);
    }
  }
};

const deleteItem = async (item) => {
  if (items[item.type].value.includes(item)) {
    try {
      await axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
              mutation ($id: Int) {
                  delete: deleteItem(id: $id)
              }
          `,
          variables: {
            id: item.id,
          },
        },
      }).then((response) => {
        const query = response.data;
        if (query.data.delete) {
          items[item.type].value.splice(
            items[item.type].value.indexOf(item),
            1
          );
        }
      });
    } catch (error) {
      alert(error);
    }
  }
};

// requesting initial values from Graphql with Axios
onMounted(getItems("prefix"), getItems("suffix"));

// reactive computed state
const domains = computed(() => {
  const domainslist = [];
  for (const p of items.prefix.value) {
    for (const s of items.suffix.value) {
      const name = p.description + s.description;
      const checkout = `https://cart.hostgator.com.br/?pid=d&sld=${name.toLocaleLowerCase()}&tld=.com.br`;
      domainslist.push({
        name,
        checkout,
      });
    }
  }
  return domainslist;
});

// https://financeiro.hostgator.com.br/api/v2/shop/br/domains/availability/com.br/airstation
</script>

<style scoped>
</style>
