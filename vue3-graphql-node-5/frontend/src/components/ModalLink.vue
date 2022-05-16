<template>
  <!-- https://dev.to/tefoh/use-bootstrap-5-in-vue-correctly-2k2g -->
  <a class="nav-link" href="#" @click="modal.show()">Modal</a>
  <div class="modal fade" ref="exampleModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            @click="modal.hide()"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="modal.hide()">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap";
export default {
  name: "ModalLink",
  data: () => ({
    modal: null,
  }),
  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
  },
};
</script>
