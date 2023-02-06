export const getTimeParts = (time: number) => {
  const hours = ("0" + Math.floor((time / (1000 * 60 * 60)) % 60)).slice(-2);

  const min = ("0" + Math.floor((time / (1000 * 60)) % 60)).slice(-2);

  const secs = ("0" + Math.floor((time / 1000) % 60)).slice(-2);

  return { hours, min, secs };
};
