import { shallowMount } from "@vue/test-utils";
import ShowDetailButton from "@/components/ShowDetailButton.vue";

let wrapper: any;

beforeEach(() => {
  wrapper = shallowMount(ShowDetailButton, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("ShowDetailButton.vue", () => {
  it("is a Vue instance", () => {
    expect(wrapper.html()).toBeTruthy();
  });

  it("should show eye when showDetails is true", async () => {
    //given
    const button = wrapper.find(".fas");

    //then
    expect(button.attributes("text.decode")).toBe("&#xf06e;");
  });

  it("should show eye crossed out when showDetails is false", async () => {
    //given
    const button = wrapper.find(".fas");

    //when
    await wrapper.setProps({ showDetails: false });

    //then
    expect(button.attributes("text.decode")).toBe("&#xf070;");
  });
});
