export default function changePath(content) {
  return {
    type: "path/pathChanged",
    payload: {
      path: content,
    },
  };
}
