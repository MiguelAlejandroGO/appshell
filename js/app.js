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
  .catch((error) => console.log("La conexion con el servicio fallo"));

container = document.querySelector(".container");
const alert_content = document.querySelector("#alert-content");

const showDogs = (result) => {
  if (result == "" || result == null) {
    Console.log("La conexion con el servicio fallo");
  } else {
    alert_content.classList.add("d-none");
    for (let i = 0; i < result.message.length; i++) {
      const movieElement = document.createElement("div");
      movieElement.classList.add("col");
      movieElement.innerHTML = `

        
            <div class="card">
            <img src=${result.message[i]} class="card-img-top" alt="...">
                <div class="card-body">
                   <div class="button btn btn-info" onmousedown="party.confetti(this)">Adoptame!</div>
                </div>
           </div>
     
        `;
      main.appendChild(movieElement);
    }
  }
};
