export const emit = (element: any, event: string) => {
  element.vm.$emit(event);
};

export const nextTick = (element: any) => {
  return element.vm.$nextTick();
};
