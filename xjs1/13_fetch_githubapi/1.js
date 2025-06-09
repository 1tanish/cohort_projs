document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  console.log(document.querySelector(".name").value);
  fetch(`https://api.github.com/users/${document.querySelector(".name").value}`)
    .then((res) => {
      const p = document.createElement("p");
      document.querySelector("form").appendChild(p);
      par=document.querySelector("p");
      par.innerHTML = `<h1 class='flex justify-center items-center uppercase pt-10'>Fetching User ID...</h1>`;
      return res.json();
    })
    .then((data) => {
      console.log("fetching id...");
      setTimeout(() => {
        console.log(data.id);
        par.innerHTML = `<h1 class='flex justify-center items-center uppercase pt-10'>User ID: ${data.id}</h1>`;
      }, 1000);
    });
});
