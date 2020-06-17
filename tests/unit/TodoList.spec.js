import { shallowMount } from "@vue/test-utils";
import TodoList from "../../src/components/TodoList";

let tasks = [
  {
    title: "Make todo list",
    completed: true
  },
  {
    title: "Mount cake",
    completed: true
  },
  {
    title: "Decorate cake",
    completed: false
  },
  {
    title: "Make frosting",
    completed: false
  },
  {
    title: "Photograph the cake",
    completed: false
  }
];

describe("TodoList", () => {
  it("is created", () => {
    const wrapper = shallowMount(TodoList);
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  it("sets the correct default data", () => {
    expect(typeof TodoList.data).toBe("function");
    const defaultData = TodoList.data();
    expect(defaultData.tasks.title).toBe(tasks.title);
    expect(defaultData.tasks.completed).toBe(tasks.completed);
  });
});
