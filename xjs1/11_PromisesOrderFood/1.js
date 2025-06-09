const h1 = document.querySelector("h1");
h1.style.backgroundColor = "white";
h1.style.borderRadius = "10px";
h1.style.padding = "10px";
let h2 = document.createElement("h2");
let status = "";
h2.textContent = status;
document.querySelector('#main').appendChild(h2);
const food = "burger";
time= 700;

h1.addEventListener( 'click',() => {
  h1.style.display = "none";
  
  chances1 = Math.floor(Math.random()*1.2)? false : true; 
  chances2 = Math.floor(Math.random()*1.3)? false : true; 
  console.log(chances1, chances2);

  orderFood = (food) => {
    return new Promise((res, rej) => {
      h2.innerHTML = `ordering ${food}...`;
      setTimeout(() => {
        chances1==true?res():rej();
      }, time);
    });
  };
  orderDel = (food) => {
    return new Promise((res, rej) => {
      h2.innerHTML = `delivering ${food}....`;
      setTimeout(() => {
        chances2==true?res():rej();
      }, time);
    });
  };

  orderFood(food)
    .then(() => {
      h2.innerHTML = `${food} ordered`;
      orderDel(food)
        .then(() => {
          h2.innerHTML = `${food} delivered`;
          setTimeout(() => {
            h1.style.display = "block";
          }, time+1000);
        })
        .catch(() => {
          h2.innerHTML = "sorry we are not able to deliver rn";
          setTimeout(() => {
           h1.style.display = "block";
          }, time+1000);
        });
    })
    .catch(() => {
      h2.innerHTML = `${food} order failed`;
      setTimeout(() => {
        h1.style.display = "block";
      }, time+1000);
    });
});
