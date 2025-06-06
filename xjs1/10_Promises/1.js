one = function () {
  return new Promise((res, rej) => {
    console.log("promise one started");
    rej();
  });
};

two = function () {
  return new Promise((res, rej) => {
    console.log("promise two started");
    res();
  });
};

one()
  .then(() => {
    console.log("promise one completed");
    return two()
      .then(() => {
        console.log("promise two completed");
        console.log("both promises completed");
        
      })
      .catch(() => {
        console.log("promise two failed");
      });
  })
  .catch(() => {
    console.log("Error in one");
  });
