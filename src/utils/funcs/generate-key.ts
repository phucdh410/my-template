export const generateKey = (arg: any): string => {
  return Math.random() * 9999999 + new Date().getTime() + arg;
};
