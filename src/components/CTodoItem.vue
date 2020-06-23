<template>
  <li class="list-of-tasks" :class="{'list-of-tasks__completed': task.completed}" @click="$emit('complete')">
    {{ task.title }}
    <button class="list-of-tasks__remove-btn" @click="$emit('remove-item')">
      <font-awesome-icon icon="times" class="list-of-tasks__icon" />
    </button>
  </li>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "CTodoItem",
  components: {
    FontAwesomeIcon
  },
  props: ["task"]
};
</script>

<style lang="scss">
.list-of-tasks {
  background-color: rgb(241, 241, 241);
  border: 1px solid rgb(187, 183, 183);
  padding: 0px 0px 0px 10px;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  color: rgb(54, 54, 54);
  display: flex;
  justify-content: space-between;
  width: 85.4%;
  margin-left: 30px;
  margin-bottom: 0.5%;
  line-height: 3;
  @media only screen and (max-width: 768px) {
    margin-left: 4px;
  }

  &::first-letter {
    text-transform: capitalize;
  }

  &:hover {
    background-color: rgb(219, 217, 217);
    border-color: rgb(167, 165, 165);
  }

  &__completed {
    text-decoration: line-through;
    background-color: rgba(0, 128, 0, 0.15);
    border-color: rgba(0, 128, 0, 0.2);

    &:hover {
      background-color: rgba(0, 128, 0, 0.25);
      border-color: rgba(0, 128, 0, 0.3);
    }
  }
  &__remove-btn {
    font-size: 12px;
    padding: 13px 12px 13px 10px;
    margin-left: -34.3px;
    background-color: rgb(255, 69, 0);
    border: none;
    color: rgb(255, 255, 255);
    @media only screen and (max-width: 768px) {
    margin-left: 4px;
    font-size: 12px;
  }

    &:hover {
      background: rgb(248, 89, 49);
      cursor: pointer;
    } 
  }
  &__icon {
      width: 13px;
      height: 13px;
      padding: 2px 5px;
      vertical-align: text-bottom;
    }
}
</style>
