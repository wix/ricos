const getFakeLoadingPercent = updatePercentage => {
  let percent = 1;
  updatePercentage(percent);
  const interval = setInterval(() => {
    updatePercentage(percent);
    percent += 1;
    if (percent === 100) clearInterval(interval);
  }, 3000);
};

export { getFakeLoadingPercent };
