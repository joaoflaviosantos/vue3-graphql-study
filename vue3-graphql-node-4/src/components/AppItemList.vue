<template>
  <div>
    <h5>
      {{ title }} <span class="badge bg-info">{{ items.length }}</span>
    </h5>
    <div class="card">
      <div class="card-body">
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="(item, index) in items"
            :key="index"
          >
            <div class="row">
              <div class="col-md">
                {{ item }}
              </div>
              <!-- https://stackoverflow.com/a/67257313/15876118 -->
              <div class="col-md float-end text-end">
                <button
                  class="btn btn-secondary btn-sm opacity-50"
                  @click="deleteItem(item)"
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
            placeholder="Enter the item"
            v-model="item"
            @keyup.enter="addItem(item)"
          />
          <div class="input-group-append">
            <button class="btn btn-info" @click="addItem(item)">
              <span class="text-white fa fa-plus"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// props
const props = defineProps(["title", "items"]);

// reactive state
const item = ref("");

// emits
const emit = defineEmits(["addItem"]);

// methods
const addItem = async (i) => {
  if (i != null && i != "" && !props.items.includes(i)) {
    try {
      await emit("addItem", i);
      item.value = "";
    } catch (error) {
      alert(error);
    }
  }
};

const deleteItem = async (i) => {
  if (props.items.includes(i)) {
    try {
      await emit("deleteItem", i);
    } catch (error) {
      alert(error);
    }
  }
};
</script>

<style scoped></style>
