const form = document.querySelector("form");
let datanodes = document.querySelectorAll(".data");
let idbio = document.querySelector(".idbio");
let fetching = document.querySelector(".fetching");
const info = document.querySelector(".info");

function getUserInfo(username) {
  return fetch(`https://api.github.com/users/${username}`).then((res) => {
    if (!res.ok) throw new Error("User not found lol ;)");
    return res.json();
  });
}

function decorate(details,repodata) {
  const decoratedData = `<div class="info flex flex-col justify-center mt-20">
        <h1 class="nametop text-white font-mono text-[16px] text-center uppercase" >
        [ @${details.login} ]
         </h1>
        <section class="font-mono flex flex-col justify-center rounded-xl p-4 gap-5">
          <div class="flex flex-row gap-5 items-center">
            <img src=${details.avatar_url} class="usrimg w-30 h-30 rounded-lg flex" />
            <div class="p-3 idbio flex flex-col justify-evenly gap-5 bg-white rounded-xl max-w-200 overflow-hidden">
              <div class = "flex justify-between">
                <h1 class="data usrname min-w-45">Name : ${details.name}</h1>
                <h1 class="data usrID">[ ${details.id} ]</h1>
              </div>
              <h4 class="data bio text-[14px] min-w-20">'${details.bio? details.bio:""}'</h4>
              <div class="fetching animate-pulse text-[12px] text-center hidden">fetching..</div>
          <div class="flex justify-between gap-10 items-center text-[13px]" >
            <h4 class="data location capitalize min-w-20 ">📍 ${details.location? details.location: 'Location❌'}</h4>
            <h4 class="data followers min-w-20 ">Followers :${details.followers}</h4>
            <h4 class="data following min-w-20">Followings :${details.following}</h4>
          </div>
          <div class='flex text-[14px] justify-evenly items-center gap-2 flex-wrap text-center ${!repodata?hidden:'flex'}'>
          <h1>Repos :</h1>
             ${repodata.map(repo => `<h3 class="bg-gray-200 px-2 py-1 rounded">${repo.name}</h3>`).join('')}
          </div>
            </div>
          </div>
        </section>
        </div>`;
  info.innerHTML = decoratedData;
}
function errorlol(){
  const errormsg="<h1 class='text-[red] text-[20px] mt-10'>User NOT Found</h1>"
  info.innerHTML= errormsg
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`
  ).then((raw) => {
    if (!raw.ok) {
      console.log("user not found");
      throw new Error("user not found");
    }
    return raw.json();
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  nameinput=document.querySelector('.nameinp')
    userName=nameinput.value.trim()
    
  const details = getUserInfo(userName)
  const repos = getRepos(userName)
  details
    .then((data) => {
      repos.then((el)=>{
          decorate(data,el)
      }
      ).catch(decorate(data))
    })
    .catch((error) => {
      errorlol()
    });
});
