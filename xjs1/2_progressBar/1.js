btn = document.querySelector(".btn");
growth = document.querySelector(".growth");
grow = 0;
btn.innerHTML='go'
btn.addEventListener("click", () => {
  growth.style.borderWidth='3px';
  let int = setInterval(() => {
    if (grow >= 100) {
      grow = 0;//clears the grow value for more iterations
      btn.innerHTML='go'//clears the grow value for more iterations
      clearInterval(int);b
      return;
    }
    else{ grow++;
    console.log(grow);
    btn.innerHTML = grow;
    growth.style.width = grow + "%";}
  }, 10);
});

