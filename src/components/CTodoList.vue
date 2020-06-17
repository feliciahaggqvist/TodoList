<template>
  <div class="c-todo-list">
    <h1 class="c-todo-list__title">
      <a v-bind:href="refresh" class="c-todo-list__title c-todo-list__title--link">
        Tasks
        <span class="c-todo-list__length">({{tasks.length}})</span>
      </a>
    </h1>

    <form>
      <input
        class="c-todo-list__new-task"
        type="text"
        v-model="newTask"
        id="new-task"
        placeholder="New task"
      />
      <button
        class="c-todo-list__add-btn"
        :disabled="newTask.length < 1"
        @click.prevent="addNewTask"
      >
        <font-awesome-icon icon="plus" class="c-todo-list__icon" />Add
      </button>
    </form>

    <div class="c-todo-list__btn-group">
      <button class="c-todo-list__show-all-tasks-btn" @click="showAllTasks">Show all tasks</button>
      <button class="c-todo-list__filter-btn" @click="isDefaultModalVisible = true">
        <font-awesome-icon icon="angle-down" class="c-todo-list__icon" />Filter tasks
      </button>

      <CFilterModal @close="isDefaultModalVisible = false" v-show="isDefaultModalVisible">
        <template #header>
          <div>
            <h1>Filter tasks:</h1>
          </div>
        </template>

        <template #body>
          <div class="c-todo-list__c-filter-modal-btn-group">
            <button class="c-todo-list__completed-tasks-btn" @click="completedTasks">
              <font-awesome-icon icon="check" class="c-todo-list__icon" />Completed tasks
            </button>

            <button class="c-todo-list__incompleted-tasks-btn" @click="incompletedTasks">
              <font-awesome-icon icon="clock" class="c-todo-list__icon" />Incompleted tasks
            </button>
          </div>
        </template>
      </CFilterModal>

      <button class="c-todo-list__clear-completed-btn" @click="clearCompleted">
        <font-awesome-icon icon="check" class="c-todo-list__icon" />Clear completed
      </button>

      <button class="c-todo-list__clear-all-btn" @click="clearAllTasks">
        <font-awesome-icon icon="trash" class="c-todo-list__icon" />Clear all
      </button>
    </div>

    <div class="c-todo-list__listed-tasks">
      <ul>
        <CTodoItem
          v-for="(task) in displayedTasks"
          :key="task.title"
          :task="task"
          @remove-item="removeTask(task)"
          @complete="completeTask(task)"
        ></CTodoItem>
      </ul>
    </div>
  </div>
</template>

<script>
import CTodoItem from "../components/CTodoItem.vue";
import CFilterModal from "../components/CFilterModal.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "todo-list",
  components: {
    CTodoItem,
    CFilterModal,
    FontAwesomeIcon
  },

  data() {
    return {
      isDefaultModalVisible: false,
      newTask: "",
      refresh: "/",
      tasks: [
        {
          title:
            "Fix bug: when deleting one task, the task underneath it changes its 'completed' state",
          completed: false
        },
        {
          title: "Add filter feature",
          completed: true
        },
        {
          title: "Reorganize style to follow BEM structure",
          completed: true
        },
        {
          title:
            "Modify filter feature: enable toggle function between completed and incompleted tasks",
          completed: true
        },
        {
          title: "Watch a tutorial on Promise and async/await",
          completed: false
        },
        {
          title:
            "Fix bug: deleting task in filter, the deleted task in 'displayedTasks' does not match task in 'tasks'",
          completed: true
        }
      ],
      displayedTasks: []
    };
  },
  mounted() {
    this.displayedTasks = [...this.tasks];

    if (localStorage.task) {
      this.task = localStorage.task;
    }
  },
  watch: {
    task(newTask) {
      localStorage.task = newTask;
    }
  },
  methods: {
    showAllTasks: function() {
      this.displayedTasks = this.tasks;
      return this.displayedTasks;
    },
    addNewTask: function() {
      let addNewTask = {
        title: this.newTask,
        completed: false
      };
      this.tasks.push(addNewTask);
      this.displayedTasks.push(addNewTask);
      this.newTask = "";
    },
    removeTask(task) {
      this.displayedTasks.splice(this.displayedTasks.indexOf(task), 1) ==
        this.tasks.splice(this.tasks.indexOf(task), 1);
    },
    completeTask(task) {
      task.completed = !task.completed;
    },
    clearCompleted: function() {
      this.displayedTasks = this.tasks.filter(this.inProgress);
      this.tasks = this.tasks.filter(this.inProgress);
    },
    clearAllTasks: function() {
      this.displayedTasks = [];
      this.tasks = [];
    },
    inProgress: function(task) {
      return !this.isCompleted(task);
    },
    isCompleted: function(task) {
      return task.completed;
    },
    completedTasks: function() {
      this.displayedTasks = this.tasks.filter(this.isCompleted);
      this.isDefaultModalVisible = false;
    },
    incompletedTasks: function() {
      this.displayedTasks = this.tasks.filter(this.inProgress);
      this.isDefaultModalVisible = false;
    }
  }
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Cookie);

.c-todo-list {
  width: 800px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 5px 5px rgba(66, 66, 66, 0.329);
  border: 1px solid #fff;
  border-radius: 12px;
  text-align: center;
  margin-top: 85px;
  &__title {
    font-family: "Cookie";
    font-size: 60px;
    cursor: pointer;
    &--link {
      text-decoration: none;
      color: black;

      &:hover {
        color: rgb(65, 62, 62);
      }
    }
  }
  &__new-task {
    padding: 8px 8px 9px 10px;
    width: 72.1%;
    margin-right: -20px;
    margin-bottom: 3%;
  }
  &__length {
    color: #ccc;
    font-size: 35px;
  }
  &__add-btn {
    background-color: green;
    border: 1px solid green;
    padding: 7.2px 13px 10px 10px;
    margin-left: 20px;
    color: white;
    &:hover {
      background-color: rgb(1, 141, 1);
      cursor: pointer;
    }
    &:disabled {
      border: 1px solid #ccc;
      color: #ccc;
      background-color: rgb(241, 241, 241);
      cursor: initial;
    }
  }
  &__icon {
    width: 13px;
    height: 13px;
    padding: 2px 5px;
    vertical-align: text-bottom;
  }
  &__btn-group {
    display: table;
    margin-left: 282px;
  }

  &__show-all-tasks-btn {
    margin-right: 4px;
    padding: 11.7px 10px 10.5px 10px;
    background-color: rgb(60, 151, 255);
    border: none;
    color: white;
    &:hover {
      background-color: rgb(94, 177, 255);
      cursor: pointer;
    }
  }

  &__filter-btn {
    margin-right: 4px;
    padding: 10px 10px 10.5px 10px;
    background-color: orange;
    border: none;
    color: white;
    &:hover {
      background-color: rgb(251, 175, 34);
      cursor: pointer;
    }
  }
  &__c-filter-modal-btn-group {
    display: table;
    margin-top: -31px;
    margin-bottom: 10px;
  }

  &__completed-tasks-btn {
    background-color: green;
    border: none;
    color: white;
    padding: 10px 10px 10.5px 10px;
    margin-right: 23px;

    &:hover {
      background-color: rgb(1, 141, 1);
      cursor: pointer;
    }
  }
  &__incompleted-tasks-btn {
    padding: 10px 10px 10.5px 10px;
    background-color: orange;
    border: none;
    color: white;
    &:hover {
      background-color: rgb(251, 175, 34);
      cursor: pointer;
    }
  }

  &__clear-completed-btn {
    margin-right: 4px;
    background-color: green;
    border: none;
    color: white;
    padding: 10px 10px 10.5px 10px;

    &:hover {
      background-color: rgb(1, 141, 1);
      cursor: pointer;
    }
  }
  &__clear-all-btn {
    margin-right: 4px;
    background-color: orangered;
    border: none;
    color: white;
    padding: 10.3px 10px 10.5px 10px;
    cursor: pointer;
    &:hover {
      background: rgb(255, 51, 0);
    }
  }
  &__listed-tasks {
    margin-bottom: 6%;
  }
}
</style>