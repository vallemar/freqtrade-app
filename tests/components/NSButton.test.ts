import { shallowMount } from "@vue/test-utils";
import NSButton from "@/components/NSButton.vue";

let wrapper: any;

beforeEach(() => {
  wrapper = shallowMount(NSButton, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("NSButton.vue", () => {
  it("is a Vue instance", () => {
    expect(wrapper.html()).toBeTruthy();
  });

  it("style computed", () => {
    expect(wrapper.vm.background).toBe("bg-primary");
  });

  describe("when the button is pressed", () => {
    it("should emit the tap event when it is not disabled", async () => {
      //given
      const button = wrapper.find("#ns-button");

      //when
      button.trigger("tap");

      //then
      expect(wrapper.emitted().tap).toBeTruthy();
    });

    it("should not emit the tap event when it is disabled", async () => {
      //given
      const button = wrapper.find("#ns-button");

      //when
      await wrapper.setProps({ disabled: true });
      button.trigger("tap");

      //then
      expect(wrapper.emitted().tap).toBeUndefined();
    });
  });
});
