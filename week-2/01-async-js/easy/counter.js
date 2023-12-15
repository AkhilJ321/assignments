// Creating a counter in javascript
// Complete the following program to implement a counter in javascript.

const timer = 5;
let counter = 0;
// use setTimeout

const displayCount = () => {
  console.log(counter);
  counter++;
  if (counter <= timer) {
    setTimeout(displayCount, 1000);
  } else {
    return;
  }
};
