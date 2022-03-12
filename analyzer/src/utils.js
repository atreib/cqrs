const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const random = (max) => {
  return Math.floor(Math.random() * max);
};

module.exports = { sleep, random };
