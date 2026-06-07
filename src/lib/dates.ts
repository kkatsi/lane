export const calculateDaysFromToday = (endDate: Date) => {
  const currentDate = new Date();
  const timeDifference = endDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
};
