import { shallowMount } from "@vue/test-utils";
import TodoItem from "../../src/components/TodoItem";

let task = { title: "Make todo list", completed: true };

describe("TodoItem", () => {
  it("is created", () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        task
      }
    });
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  it("should set all available props", () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        task
      }
    });
    expect(wrapper.props("task").completed).toBe(task.completed);
    expect(wrapper.props("task").title).toBe(task.title);
  });
  it("should trigger click event to emit 'complete'", () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        task
      }
    });
    const clickOnTodoItem = wrapper.find("li");
    clickOnTodoItem.trigger("click");
    expect(wrapper.emitted("complete")).toBeTruthy();
  });
  it("should trigger click event to emit 'remove-item'", () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        task
      }
    });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.emitted("remove-item")).toBeTruthy();
  });
  it("should toggle emitted value of 'complete'", () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        task
      }
    });
    const clickOnTodoItem = wrapper.find("li");
    clickOnTodoItem.trigger("click");
    expect(wrapper.emitted("complete", true)).toBeTruthy();
    clickOnTodoItem.trigger("click");
    expect(wrapper.emitted("complete", false)).toBeTruthy();
  });
});
