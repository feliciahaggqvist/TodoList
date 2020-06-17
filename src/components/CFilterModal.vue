<template>
  <transition name="modal-fade">
    <div class="c-filter-modal-backdrop" @click="close">
      <div class="c-filter-modal" @click.stop>
        <font-awesome-icon icon="times" class="c-filter-modal__close-icon" @click="close" />
        <header class="c-filter-modal__header" v-if="hasHeaderSlot">
          <slot name="header"></slot>
        </header>

        <div class="c-filter-modal__body" v-if="hasBodySlot">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CFilterModal",

  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    hasBodySlot() {
      return !!this.$slots.body;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Cookie);

.c-filter-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
}
.c-filter-modal {
  position: relative;
  border-radius: 12px;
  max-width: 100%;
  background: white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.16);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  &__close-icon {
    color: black;
    font-size: 14px;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
  &__header {
    align-items: flex-start;
    justify-content: space-between;
    font-family: 'Cookie';
    font-size: 20px;
  }
  &__body {
    position: relative;
    padding: 24px;
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>