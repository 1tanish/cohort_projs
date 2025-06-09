document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = document.querySelector("form");
  const nameInput = document.querySelector(".name").value;

  // Remove existing result if any
  const existingP = form.querySelector("p");
  if (existingP) existingP.remove();

  // Create a new <p> to show status
  const p = document.createElement("p");
  p.innerHTML = `<h1 class='flex justify-center items-center uppercase pt-10'>Fetching User ID...</h1>`;
  form.appendChild(p);

  fetch(`https://api.github.com/users/${nameInput}`)
    .then((res) => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
    .then((data) => {
      setTimeout(() => {
        p.innerHTML = `<h1 class='flex justify-center items-center uppercase pt-10'>User ID: ${data.id}</h1>`;
      }, 1000);
    })
    .catch((error) => {
      p.innerHTML = `<h1 class='flex justify-center items-center text-red-500 uppercase pt-10'>Error: ${error.message}</h1>`;
    });
});