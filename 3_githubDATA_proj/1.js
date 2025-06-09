const form = document.querySelector("form");
let datanodes = document.querySelectorAll(".data");
let idbio = document.querySelector(".idbio");
let fetching = document.querySelector('.fetching')
function getUserInfo(username) {
  return fetch(`https://api.github.com/users/${username}`).then((res) => {
    if (!res.ok) throw new Error("User not found lol ;)");
    return res.json();
  });
}


form.addEventListener("submit", function (event) {
  event.preventDefault();

  let img = document.querySelector("img");
  img.setAttribute(
    "src",
    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
  );

  let section = document.querySelector("section");
  section.classList.remove("hidden");
  
  let bio = document.querySelector(".bio");
  let followers = document.querySelector(".followers");
  let following = document.querySelector(".following");
  let location = document.querySelector(".location");
  location.innerText = "location";
  following.innerText ='following';
  followers.innerText ='followers';

  const username = document.querySelector(".usrname");
  const input = document.querySelector(".name");
  const nameinput = input.value.trim();
  const nametop = document.querySelector(".nametop");
  if (!nameinput) {
    section.classList.add("hidden");
    nametop.innerText=''
    alert("Please enter a username");
    return;
  }

  nametop.classList.remove("hidden");
  nametop.innerText = `[ ${nameinput} ]`;
  input.value = "";

  datanodes.forEach((elem) => {
    elem.classList.add("hidden");
  });
  idbio.classList.add("hidden");

  fetching.classList.remove('hidden')

  getUserInfo(nameinput)
    .then((data) => {
      section.classList.remove("text-transparent");
      setTimeout(() => {
        fetching.classList.add('hidden')
        datanodes.forEach((elem) => {
          elem.classList.remove("hidden");
        });
        idbio.classList.remove("hidden", "text-transparent");

        username.innerText = `Id: ${data.id}`;
        if (data.bio != null) {
          bio.innerText = data.bio;
        } else {
          bio.classList.add("hidden");
        }
        img.classList.remove("hidden");
        img.src = data.avatar_url;
        followers.innerText = `Follwers: ${data.followers}`;
        following.innerText = `Following: ${data.following}`;
        location.innerText = data.location
          ? `📍 ${data.location}`
          : "location❌";
      }, 2000);
      datanodes.forEach((elem) => {
        elem.classList.remove("animate-pulse");
      });
    })
    .catch((error) => {
      bio.classList.add("hidden");
      section.classList.add("text-center");
      username.innerText = `${error.message}`;
      img.classList.add("hidden");
      followers.innerText = `-`;
      following.innerText = `-`;
      location.innerText = "-";
      img.classList.add("hidden");
    });
});
