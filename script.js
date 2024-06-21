const buttonLogin = document.getElementById("loginButton"); //Salva il nodo in una costante//
const buttonLogout = document.getElementById("logoutButton");
const phrase = document.getElementById("titolo");

function login() {
  window.localStorage.setItem("isLogged", "true"); //setItem richiede due parametri: chiave e valore (entrambi sotto forma di stringa)
}

function logout() {
  window.localStorage.setItem("isLogged", "false");
}

function checkStatus() {
  const status = window.localStorage.getItem("isLogged");
  if (status === "true") {
    buttonLogout.removeAttribute("hidden");
    phrase.removeAttribute("hidden");
  }
}

buttonLogin.addEventListener("click", login); //Esegue al click la funzione in riga 3//
buttonLogout.addEventListener("click", logout);

// function login() {
//window.localStorage.getItem("isLogged")
// } //
