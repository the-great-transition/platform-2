export function navPreviousNext (array, index) {
  let previous = null;
  let next = null;
  let compare = null;
  let end = false;
  array.forEach((a) => {
    if (previous === null && next === null && a.id === index && compare===null) previous = false;
    else if (!end && next === null && next !== false) previous = compare;
    if (end && next === null && next !== false) next = a.id;
    if (previous !== null && a.id === index) end = true;
    if (next !== null && next !== false) end = false;
    compare = a.id;
  });
  const output = { previous: previous, next: next };
  return output;
};
