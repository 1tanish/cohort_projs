const h1 = document.querySelector("h1");
h1.style.backgroundColor = "white";
h1.style.borderRadius = "10px";
h1.style.padding = "10px";
let h2 = document.createElement("h2");
let status = "";
h2.textContent = status;
document.querySelector('#main').appendChild(h2);
const food = "burger";


h1.addEventListener("click", () => {
  h1.style.backgroundColor = "transparent";
  h2.style.display = "none";

  orderFood = (food) => {
    return new Promise((res, rej) => {
      h1.innerHTML = `ordering ${food}...`;
      setTimeout(() => {
        res();
      }, 2000);
    });
  };
  orderDel = (food) => {
    return new Promise((res, rej) => {
      h1.innerHTML = `delivering ${food}....`;
      setTimeout(() => {
        rej();
      }, 2000);
    });
  };

  orderFood(food)
    .then(() => {
      h1.innerHTML = `${food} ordered`;
      orderDel(food)
        .then(() => {
          h1.innerHTML = `${food} delivered`;
          status='delivered';
          h2.textContent = status;
          setTimeout(() => {
            h1.innerHTML = "order again";
            h1.style.backgroundColor = "white";
            h2.style.display = "block";
          }, 1000);
        })
        .catch(() => {
          h1.innerHTML = "sorry we are not able to deliver rn";
          status='order not delivered';
          h2.textContent = status;
          setTimeout(() => {
            h1.innerHTML = "order again";
            h1.style.backgroundColor = "white";
            h2.style.display = "block"; 
          }, 3000);
        });
    })
    .catch(() => {
      h1.innerHTML = `error in delivering ${food}`;
      setTimeout(() => {
        h1.innerHTML = "order again";
        h1.style.backgroundColor = "white";
      }, 3000);
    });
});
