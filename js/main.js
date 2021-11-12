window.onload = function(){ 
  setTimeout(function(){
    document.querySelector(".preloader").style.display = "none"; 
},5000);
  
}
let newServiceWorker;
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then((registerEvent) => {
        registerEvent.addEventListener("updatefound", () => {
          newServiceWorker = registerEvent.installing;
          newServiceWorker.addEventListener("statechange", () => {
            switch (newServiceWorker.state) {
              case "installed":
                showSnackbarUpdate();
                break;
            }
          });
        });
      });
  });
}
function showSnackbarUpdate() {
  let x = document.getElementById("snackbar");
  x.className = "show";
}
let lauchUpdate = document.getElementById("lauchUpdate");
lauchUpdate.addEventListener("click", () => {
  newServiceWorker.postMessage({
    action: "skipWaiting",
  });
  window.location.reload();
});
var requestOptions = {
  method: "GET",
  redirect: "follow",
};
fetch("https://dog.ceo/api/breeds/image/random/21", requestOptions)
  .then((response) => response.json())
  .then((result) => showDogs(result))
  .catch((error) => erroShowAlert(error));
container = document.querySelector(".container");
const alert_content = document.querySelector("#alert-content");
const showDogs = (result) => {
    for (let i = 0; i < result.message.length; i++) {
      const movieElement = document.createElement("div");
      movieElement.classList.add("col");
      movieElement.innerHTML = `
            <div class="card">
            <img src=${result.message[i]} class="card-img-top" alt="image-dog" width="70px" height="340px">
                <div class="card-body">
                   <div class="button btn btn-info" onmousedown="party.confetti(this)">Adoptame!</div>
                </div>
           </div>
     
        `;
      main.appendChild(movieElement);
    }
};
function erroShowAlert(error) {
  if(error) {
    alert_content.classList.remove("d-none");
  }
}