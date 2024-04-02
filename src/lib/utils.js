const { clsx } = require("clsx");
const { twMerge } = require("tailwind-merge");

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function nextWeek() {
  let currentDate = new Date();
  let nextWeekDate = new Date();
  nextWeekDate.setDate(currentDate.getDate() + 7);
  return nextWeekDate;
}

function sortObject(object) {
  const sortedKeys = Object.keys(object).sort();

  // Create a new object with sorted keys
  const sortedVote = {};
  sortedKeys.forEach((key) => {
    sortedVote[key] = object[key];
  });
  return sortedVote;
}

function getHightValueObjectKey(object) {
  let maxValue = -Infinity;
  let hightKey = "";
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const value = object[key];
      if (value > maxValue) {
        hightKey = key;
        maxValue = value;
      } else if (value === maxValue) {
        hightKey = "";
      }
    }
  }
  return hightKey;
}

function getFromAndTo(page, itemPerPage = 3) {
  let from = page * itemPerPage;
  let to = from + itemPerPage;

  if (page > 0) {
    from += 1;
  }

  return { from, to };
}

module.exports = {
  cn,
  nextWeek,
  sortObject,
  getHightValueObjectKey,
  getFromAndTo,
};
