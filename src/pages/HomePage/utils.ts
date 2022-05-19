import { NodeData } from "./HomePage";

export const normalize = (name: string) => {
  return name.replace(/['.\s]/g, "_");
};

export const configureImage = (node: NodeData) => {
  if (!isNaN(+node.avatar)) {
    // github user id
    return `https://avatars.githubusercontent.com/u/${node.avatar}`;
  } else {
    return node.avatar;
  }
};

