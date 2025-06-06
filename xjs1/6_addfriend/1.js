arr = [
  {
    name: "Aarav Mehta",
    age: 28,
    designation: "Software Engineer",
    city: "Bangalore",
    rate: "120$/hr",
    status: "add",
  },
  {
    name: "Neha Sharma",
    age: 32,
    designation: "Product Manager",
    city: "Mumbai",
    rate: "180$/hr",
    status: "add",
  },
  {
    name: "Rohan Kapoor",
    age: 26,
    designation: "Data Analyst",
    city: "Pune",
    rate: "150$/hr",
    status: "add",
  },
  {
    name: "Priya Singh",
    age: 30,
    designation: "HR Manager",
    city: "Delhi",
    rate: "220$/hr",
    status: "add",
  },
  {
    name: "Karan Verma",
    age: 35,
    designation: "Sales Lead",
    city: "Chennai",
    rate: "780$/hr",
    status: "add",
  },
];
var main = document.querySelector("#main");

function card() {
  sum = "";
  arr.forEach((elem, idx) => {
    sum += `<div class="cards w-80 bg-white rounded-[10px] flex flex-col items-center p-[5px]">
        <div class="cardst w-full aspect-4/3 rounded-[5px] bg-red-100 p-5 font-mono capitalize flex flex-col">
            <h1 class="text-right">${elem.rate}</h1>
            <h1 class="text-[28px] mt-20">${elem.name}'${elem.age}</h1>
            <h1 class="text-[12px]">${elem.designation}</h1>
        </div>
        <div class="cardsb flex gap-20 w-full h-20 items-center font-mono">
            <h2 class="city text-[20px] px-2 ">${elem.city}</h2>
            <button id=${idx} class='w-full bg-red-200 text-red-400 float-right p-1 px-3 rounded-[5px]'>${elem.status}</button>
        </div>
      </div>`;
  });
  main.innerHTML = sum;
   document.querySelectorAll(".cards").forEach((cardElem, idx) => {
    const cityElem = cardElem.querySelector(".city");
    if (arr[idx].status === "add") {
      cityElem.classList.add("hidden");
    } else {
      cityElem.classList.remove("hidden");
    }
  });
}
card();
setInterval(()=>{
  location.href='#4'
},3000)

var cardst = document.querySelector(".cardst");
var cardsb = document.querySelector(".cardsb");

main.addEventListener("click", function (dets) {
  if (arr[dets.target.id].status == "add") {
    arr[dets.target.id].status = "friends";
  } else {
    arr[dets.target.id].status = "add";
  }
  card();
});
