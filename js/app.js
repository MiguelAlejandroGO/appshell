
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://dog.ceo/api/breeds/image/random/21", requestOptions)
  .then(response => response.json())
  .then(result => showDogs(result))
  .catch(error => erroConection(error));


container = document.querySelector(".container")
const alert_content = document.querySelector("#alert-content");

const showDogs = (result) => {
    for (let i = 0; i < result.message.length; i++) {
      const movieElement = document.createElement('div');
      movieElement.classList.add('col');
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

 function erroConection(error){
    if(error){
      alert_content.classList.remove("d-none");
    }
  }
