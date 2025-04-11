export const notReachable = (value: never): never => {
  throw new Error(`Unhandled value: ${value}`);
};
