a = document.querySelector(".box");
out = document.querySelector(".out");
but = document.querySelector(".but");
but.innerHTML = "change";
x = 0;
but.addEventListener("click", function () {
  c1 = Math.floor(Math.random() * 256);
  c2 = Math.floor(Math.random() * 256);
  c3 = Math.floor(Math.random() * 256);
  a.style.backgroundColor = `rgb(${c1},${c2},${c3})`;
});
but.addEventListener("mouseover", function () {
  c1 = Math.floor(Math.random() * 256);
  c2 = Math.floor(Math.random() * 256);
  c3 = Math.floor(Math.random() * 256);
  a.style.backgroundColor = `rgb(${c1},${c2},${c3})`;
});
but.addEventListener("mouseout", function () {
  c1 = Math.floor(Math.random() * 256);
  c2 = Math.floor(Math.random() * 256);
  c3 = Math.floor(Math.random() * 256);
  a.style.backgroundColor = `rgb(${c1},${c2},${c3})`;
});
setInterval(() => {
  c1 = Math.floor(Math.random() * 256);
  c2 = Math.floor(Math.random() * 256);
  c3 = Math.floor(Math.random() * 256);
  a.style.backgroundColor = `rgb(${c1},${c2},${c3})`;
}, 100);
