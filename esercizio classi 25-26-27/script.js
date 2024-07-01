//Capire come limitare l'accesso dell'utente a massimo 2 dispositivi, altrimenti ti impedisce il logout

class App {
  users = [];
  ads = [];
  reviews = [];
  auth = [];
  reports = [];
  favourites = [];
  devices = [];

getUserByToken(token) {
  const tokenFound = this.auth.find((auth) => {
    if (auth.token === token) return true;
    else false;
  });

  if (!tokenFound) return null; //! Se non esiste, ritorna null//
  else return tokenFound;
}

  register(email, password) {
    //Registra un nuovo utente
    const userFound = this.users.find(function (user) {
      //Poichè "users" è un array, si usa il metodo "find()" con una funzione anonima tra parentesi tonde
      if (user.mail === email) return true;
      else return false; //La funzione restituirà un booleano
    });
    if (!!userFound)
      //!! serve per dire "Se esiste..."
      console.log("Email già registrata");
    else {
      const newUser = new ModelUser(email, email, password); //Ci sono due email perchè una viene usata come username, l'altra come email vera e propria
      this.users = [...this.users, newUser];
      console.log("Registrazione effettuata con successo");
    }
  }

  login(email, password) {
    //Funzione di login
    const userFound = this.users.find(function (user) {
      if (user.email === email && user.password === password) return true;
      else return false;
    });
    if (!!userFound) {
      const newAuth = new ModelAuth(userFound.primaryKeyUser); //Bisogna passare il parametro a "ModelAuth"
      this.auth = [...this.auth, newAuth]; //Accedi ad "Auth" e crea un nuovo elemento
      return newAuth.token;
    } else console.log("Utente non registrato");
  }

  logout(token) {
    //Funzione di logout
    const authFound = this.auth.find(function (auth) {
      if (auth.token === token) return true;
      else return false;
    });
    if (!!authFound) {
      this.auth = this.auth.filter(function (auth) {
        if (auth.token === token) return false;
        else return true;
      });
      console.log("Logout effettuato con successo");
    } else console.log("Token non valido");
  }

devices(iduser, iddevice, nomedevice) {} //Gestione dei dispositivi

modifyUsername(token, username) { //Modifica il nome dell'utente
    const authFound = this.auth.find(fucntion (auth)
  ){
    if (auth.token === token) return true;
    else return false;
  }
  const userFound = this.users.find(function (user){
    if(user.primaryKey === authFound.referenceKeyUser) return true;
    else return false;
  }
)
userFound.username = this.username;
  }

  modifyPassword() {} //Modifica la password

  modifiyEmail() {} //Modifica l'email

  deleteAccount() {} //Elimina l'account

createAd(token,title,description,category,status,price,address,urlPhoto) {  //Crea un annuncio
    const authFound  = this.getUserByToken(token);

    if (!authFound ) {
      console.log("token non valido");
    } else {
      const ad = new ModelAd(title,description,category,status,price,address,phone,urlPhoto,authFound.referenceKeyUser);
      this.ads = [...this.ads, ad];
      console.log('annuncio creato con successo')
    }
  }

  modifyAd() {} //Modifica l'annuncio

  deleteAd() {} //Elimina l'annuncio

  reportAd() {} //Segnala l'annuncio

  markAsSold() {} //Contrassegna l'annuncio come "venduto"

  createReview() {} //Crea una recensione

  modifyReview() {} //Modifica la recensione

  deleteReview() {} //Elimina la recensione

  filterCategory() {} //Filtra gli annunci per categoria

  filterPrice() {} //Filtra gli annunci per prezzo

  createFavouriteList(referenceKeyUser, referenceKeyAd, sold) {} //Crea una lista dei preferiti

isTokenValid(token) {
  const authFound = this.auth.find(function (auth){
    if(auth.token === token) return true
    else {
      return false;
    }    
    })
    if (!!authFound) return true
    else {
      return false;
    }
    }
}

  addFavourite(token, referenceKeyAd) { //Aggiungi un elemento alla lista di preferiti
    const idUser = this.getIdUserByToken(token);
    if(!idUser) console.log("Token non valido")
      else {
    const newFavourite = new ModelFavourite(idUser, referenceKeyAd);
    userAuth.referenceKeyUser
    referenceKeyAd;
    this.favourites = [...this.favourites, newFavourite]
    console.log("Aggiunto ai preferiti")
      }
  }

  modifyFavouriteList() {} //Modifica la lista dei preferiti

  deleteFavouriteList() {} //Elimina la lista dei preferiti
  
class ModelUser {
  //I "Model" servono per costruire il singolo oggetto
  constructor(username, email, password) {
    this.primaryKey = Math.random();
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

class ModelAds {
  constructor(
    title,
    description,
    category,
    status,
    price,
    photo,
    address,
    referenceKeyAd
  ) {
    this.primaryKey = Math.random();
    this.referenceKeyAd = referenceKeyAd;
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = status;
    this.price = price;
    this.photo = photo;
    this.address = address;
  }
}

class ModelReviews {
  constructor(referenceKeyUser, title, description, rating, date) {
    this.referencekeyuser = referencekeyuser;
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.date = date;
  }
}

class ModelAuth {
  cosntructor(referenceKeyUser) {
    this.token = Math.random();
  }
}

class ModelReport {
  constructor(referenceKeyUser) {
    //Prima si cerca l'ID dell'utente
    this.primaryKeyAuth = Math.random(); //
    this.referenceKeyUser = referenceKeyUser;
    // this.referenceKeyAd = referenceKeyAd; da verificare
  }
}

class ModelDevices {
  constructor (referenceKeyUser)
  this.idusers = idusers;
  this.iddevice = iddevice;
  this.device = device;
}

const user = new ModelUser("NomeCognome", "email@email.com", "Password1234"); //Serve a salvare il valore della classe;
const ads = new ModelAd(
  "ID",
  "Titolo",
  "Descrizione",
  "Categoria",
  "Status",
  "Prezzo",
  "Foto",
  "Indirizzo"
);
const reviews = new ModelReviews("Title", "Description", "Rating", "Date");
const auth = new ModelAuth("IDUser", "Token");
