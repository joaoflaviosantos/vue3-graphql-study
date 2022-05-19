<template>
  <div class="mt-2">
    <h5>
      {{ title }} <span class="badge bg-info">{{ items.value.length }}</span>
    </h5>
    <div class="card" style="min-height: 14rem">
      <div class="card-body">
        <ul class="list-group" v-if="items.value.length == 0">
          <li class="list-group-item list-group-item-danger">
            <div class="row">
              <div class="col-md-1">
                <span class="fa fa-exclamation"></span>
              </div>
              <div class="col-md">Please enter at least one {{ type }}</div>
            </div>
          </li>
        </ul>
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="item in items.value"
            :key="item.id"
          >
            <div class="row">
              <div class="col-md">
                {{ item.description }}
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
            @keyup.enter="addItem(type, item)"
          />
          <div class="input-group-append">
            <button class="btn btn-info" @click="addItem(type, item)">
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
const props = defineProps(["title", "type", "items"]);

// reactive state
const item = ref("");

// emits
const emit = defineEmits(["addItem", "deleteItem"]);

// methods
const addItem = async (type, i) => {
  const description = i;
  if (
    description != null &&
    description != "" &&
    !props.items.value.includes(description)
  ) {
    try {
      await emit("addItem", {
        type,
        description,
      });
      item.value = "";
    } catch (error) {
      alert(error);
    }
  }
};

const deleteItem = async (i) => {
  if (props.items.value.includes(i)) {
    try {
      await emit("deleteItem", i);
    } catch (error) {
      alert(error);
    }
  }
};
</script>

<style scoped></style>
