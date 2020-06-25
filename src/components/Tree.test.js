import { CountLeafNodes } from "./Tree";

test("count leaf nodes", () => {
  const test = {
    label: "test",
    branchset: [
      {
        label: "child1",
        branchset: [{ label: "grandchild1" }],
      },
      {
        label: "child2",
        branchset: [{ label: "grandchild1" }, { label: "grandchild2" }],
      },
    ],
  };
  expect(CountLeafNodes(test)).toBe(3);
});
