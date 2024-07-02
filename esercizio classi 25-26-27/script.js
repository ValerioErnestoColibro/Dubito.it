//Capire come limitare l'accesso dell'utente a massimo 2 dispositivi, altrimenti ti impedisce il logout

class App {
  //Lista delle proprietà della classe (ognuna è un array)
  users = [];
  ads = [];
  reviews = [];
  auth = []; //Lista dei token di autenticazione
  reports = [];
  favourites = [];
  devices = [];

  getUserByToken(token) {
    //Restituisce l'autenticazione corrispondente al token definito. Se il token non è valido, restituisce "null"
    const tokenFound = this.auth.find((auth) => auth.token === token); //Trova il token nella lista delle autenticazioni
    if (!tokenFound) return null; //Se non trova il token, restituisce "null"
    else return tokenFound; //Se lo trova, restituisce l'autenticazione corrispondente
  }

  register(email, password) {
    const userFound = this.users.find((user) => user.email === email); //Controlla se l'email è già registrata
    if (!!userFound) console.log("Email già registrata");
    //Se l'email è già registrata, restituisce il testo
    else {
      const newUser = new ModelUser(email, email, password); //Crea un nuovo utente
      this.users = [...this.users, newUser]; //Aggiungi il nuovo utente alla lista
      console.log("Registrazione effettuata con successo"); //Stampa un messaggio di successo
    }
  }

  login(email, password) {
    const userFound = this.users.find(
      (user) => user.email === email && user.password === password
    ); //Cerca un utente con email e password corrispondenti
    if (!!userFound) {
      const newAuth = new ModelAuth(userFound.primaryKey); //Crea una nuova autenticazione per l'utente
      this.auth = [...this.auth, newAuth]; //Aggiunge l'autenticazione alla lista
      return newAuth.token; //Restituisce un nuovo token di autenticazione
    } else console.log("Utente non registrato"); //Stampa un messaggio di sconfitta
  }

  logout(token) {
    const authFound = this.auth.find((auth) => auth.token === token); //Trova l'autenticazione corrispondente al token
    if (!!authFound) {
      this.auth = this.auth.filter((auth) => auth.token !== token); //Rimuove l'autenticazione dalla lista
      console.log("Logout effettuato con successo"); //Stampa un messaggio di vittoria
    } else console.log("Token non valido"); //Stampa un messaggio di sconfitta
  }

  registerDevice(token, iddevice, nomedevice) {
    const authFound = this.getUserByToken(token); //Trova l'autenticazione corrispondente al token
    if (authFound) {
      const newDevice = new Device(
        authFound.referenceKeyUser,
        nomedevice,
        iddevice
      ); //Crea un nuovo dispostivo cercando se c'è già un nome corrispondente
      this.devices = [...this.devices, newDevice]; //Aggiunge il dispositivo alla lista
      console.log("Dispositivo registrato con successo"); //Stampa un messaggio di vittoria
    } else {
      console.log("Token non valido"); //Stampa un messaggio di sconfitta
    }
  }

  uploadDevice(token, iddevice, newNomedevice) {
    const authFound = this.getUserByToken(token); //Trova l'autenticazione corrispondente al token
    if (authFound) {
      const device = this.devices.find(
        (device) =>
          device.id === iddevice &&
          device.referenceKeyUser === authFound.referenceKeyUser
      ); //Trova il dispositivo corrispondente all'ID e all'utente autenticato
      if (device) {
        device.name = newNomedevice; //Aggiorna il nome del dispositivo
        console.log("Dispositivo aggiornato con successo"); //Stampa un messaggio di vittoria
      } else {
        console.log("Dispositivo non trovato"); //Stampa un messaggio di sconfitta
      }
    } else {
      console.log("Token non valido"); //Se il token non è valido, stampa un messaggio di sconfitta
    }
  }

  deleteDevice(token, iddevice) {
    const authFound = this.getUserByToken(token); //Trova l'autenticazione corrispondente al token
    if (authFound) {
      this.devices = this.devices.filter(
        (device) =>
          device.id !== iddevice ||
          device.referenceKeyUser !== authFound.referenceKeyUser
      ); //Rimuove il dispositivo dalla lista
      console.log("Dispositivo eliminato con successo"); //Stampa un messaggio di vittoria
    } else {
      console.log("Token non valido"); //Stampa un messaggio di sconfitta
    }
  }

  modifyUsername(token, username) {
    const authFound = this.auth.find((auth) => auth.token === token); //Trova l'autenticazione corrispondente al token
    const userFound = this.users.find(
      (user) => user.primaryKey === authFound.referenceKeyUser
    ); //Trova l'utente corrispondente all'autenticazione
    userFound.username = username; //Aggiorna il nome utente
    console.log("Username modificato con successo"); //Stampa un messaggio di vittoria
  }

  modifyPassword(token, newPassword) {
    const authFound = this.auth.find((auth) => auth.token === token);
    const userFound = this.users.find(
      (user) => user.primaryKey === authFound.referenceKeyUser
    ); //Trova l'utente corrispondente all'autenticazione
    userFound.password = newPassword; //Aggiorna la password
    console.log("Password modificata con successo");
  }

  modifyEmail(token, newEmail) {
    const authFound = this.auth.find((auth) => auth.token === token); //Trova l'autenticazione corrispondente al token
    const userFound = this.users.find(
      (user) => user.primaryKey === authFound.referenceKeyUser
    ); //Trova l'utente corrispondente all'autenticazione
    userFound.email = newEmail; //Aggiorna l'email
    console.log("Email modificata con successo"); //Stampa un messaggio di vittoria
  }

  deleteAccount(token) {
    const authFound = this.auth.find((auth) => auth.token === token); //Trova l'autenticazione del token corrispondente
    if (authFound) {
      const userKey = authFound.referenceKeyUser; //Ottiene la chiave dell'utente corrispondente
      this.users = this.users.filter((user) => user.primaryKey !== userKey); //Rimuove l'utente dalla lista
      this.auth = this.auth.filter((auth) => auth.referenceKeyUser !== userKey); //Rimuove tutte le autenticazioni dell'utente
      this.devices = this.devices.filter(
        //Rimuove i dispositivi dell'utente
        (device) => device.referenceKeyUser !== userKey
      );
      this.ads = this.ads.filter((ad) => ad.referenceKeyUser !== userKey); //Rimuove gli annunci dell'utente
      this.reviews = this.reviews.filter(
        //Rimuove le recensioni dell'utente
        (review) => review.referenceKeyUser !== userKey
      );
      console.log("Account eliminato con successo"); //Stampa un messaggio di vittoria
    } else {
      console.log("Token non valido"); //Stampa un messaggio di sconfitta
    }
  }

  createAd(
    token,
    title,
    description,
    category,
    status,
    price,
    address,
    phone,
    urlPhoto
  ) {
    const authFound = this.getUserByToken(token); //Trova l'autenticazione corrispondente al token
    if (!authFound) {
      console.log("Token non valido"); //Se il token non è valido, stampa un messaggio di sconfitta
    } else {
      const ad = new ModelAd(
        title,
        description,
        category,
        status,
        price,
        address,
        phone,
        urlPhoto,
        authFound.referenceKeyUser
      ); //Crea un nuovo annuncio
      this.ads = [...this.ads, ad]; //Aggiunge l'annuncio alla lista
      console.log("Annuncio creato con successo"); //Stampa un messaggio di successo
    }
  }

  updateAd(
    token,
    referenceKeyAd,
    title,
    description,
    category,
    status,
    price,
    address,
    urlPhoto
  ) {
    const authFound = this.getUserByToken(token); //Trova l'autenticazione corrispondente al token
    if (!authFound) {
      console.log("Token non valido"); //Se il token non è valido, stampa un messaggio di sconfitta
      return null;
    }
    const adFound = this.ads.find((ad) => ad.primaryKey === referenceKeyAd); //Trova l'annuncio corrispondente alla chiave di riferimento
    if (adFound) {
      Object.assign(adFound, {
        title,
        description,
        category,
        status,
        price,
        address,
        urlPhoto,
      }); //Aggiorna le informazioni dell'annuncio
      console.log("Annuncio aggiornato con successo"); //Stampa un messaggio di vittoria
    } else {
      console.log("Annuncio non trovato"); //Stampa un messaggio di sconfitta
    }
  }

  deleteAd(token, referenceKeyAd) {
    const authFound = this.getUserByToken(token); //Trova autenticazione corrispondente al token
    if (!authFound) {
      console.log("Token non valido"); //Se non trova il token autenticato, stampa un messaggio di sconfitta
      return;
    }
    const adFound = this.ads.find((ad) => ad.primaryKey === referenceKeyAd); //Trova l'annuncio tramite la PrimaryKey
    if (adFound && adFound.referenceKeyUser === authFound.referenceKeyUser) {
      this.ads = this.ads.filter((ad) => ad.primaryKey !== referenceKeyAd); //Rimuove l'annuncio selezionato
      console.log("Annuncio eliminato con successo");
    } else {
      console.log("Annuncio non trovato o autorizzazione negata");
    }
  }

  reportAd(token, referenceKeyAd, reason) {
    //Trova l'autenticazione corrispondente al token
    const authFound = this.getUserByToken(token);
    if (!authFound) {
      console.log("Token non valido");
      return; //Se non lo trova, restituisce un messaggio di errore
    }
    const report = new ModelReport(
      authFound.referenceKeyUser,
      referenceKeyAd,
      reason
    ); //Crea una nuova segnalazione specificandone il motivo
    this.reports = [...this.reports, report];
    console.log("Annuncio segnalato con successo"); //Stampa un messaggio di vittoria
  }

  markAsSold(token, referenceKeyAd, referenceKeyUserPurchased) {
    const authFound = this.getUserByToken(token); //Verifica il token dell'utente
    if (!authFound) {
      //Se il token non è valido, stampa un messaggio di sconfitta
      console.log("Token non valido");
    } else {
      const adFound = this.ads.find((ad) => ad.primaryKey === referenceKeyAd); //Trova l'annuncio corrispondente
      if (!adFound) {
        console.log("Annuncio non trovato"); //Se non trova l'annuncio corrispondente, restituisci un errore
      } else {
        if (authFound.referenceKeyUser !== adFound.referenceKeyUser) {
          console.log("Autore non riconosciuto"); //Se l'utente non è l'autore dell'annuncio, restituire un errore
        } else {
          this.ads = this.ads.map((ad) =>
            ad.primaryKey === adFound.primaryKey
              ? { ...ad, referenceKeyUserPurchased } //Contrassegna l'annuncio come venduto
              : ad
          );
          console.log("Annuncio contrassegnato come venduto"); //Stampa un messaggio di vittoria
        }
      }
    }
  }

  createReview(token, title, referenceKeyAd, description, rating) {
    const authToken = this.getUserByToken(token); //Verifica il token dell'utente
    if (authToken) {
      const review = new ModelReview(
        authToken.referenceKeyUser,
        referenceKeyAd,
        title,
        description,
        rating
      ); //Crea una recensione
      this.reviews = [...this.reviews, review]; //Aggiungi la recensione alla lista
      console.log("Recensione creata con successo");
    } else {
      console.log("Token non valido, impossibile creare la recensione");
    }
  }

  modifyReview(token, reviewId, newTitle, newDescription, newRating) {
    const authToken = this.getUserByToken(token); //Verifica il token dell'utente
    if (authToken) {
      const review = this.reviews.find(
        (review) =>
          review.primaryKey === reviewId &&
          review.referenceKeyUser === authToken.referenceKeyUser
      ); //Trova la recensione
      if (review) {
        Object.assign(review, {
          title: newTitle,
          description: newDescription,
          rating: newRating,
        }); //Aggiorna la recensione
        console.log("Recensione aggiornata con successo");
      } else {
        console.log("Recensione non trovata");
      }
    } else {
      console.log("Token non valido");
    }
  }

  deleteReview(token, reviewId) {
    const authToken = this.getUserByToken(token); //Verifica il token dell'utente
    if (authToken) {
      this.reviews = this.reviews.filter(
        //Trova la recensione
        (review) =>
          review.primaryKey !== reviewId ||
          review.referenceKeyUser !== authToken.referenceKeyUser
      ); //Elimina la recensione
      console.log("Recensione eliminata con successo");
    } else {
      console.log("Token non valido");
    }
  }

  filterCategory(category) {
    const filteredAds = this.ads.filter((ad) => ad.category === category); //Filtra la categoria
    console.log(`Annunci filtrati per categoria "${category}":`, filteredAds); //Stampa gli annunci filtrati
    return filteredAds;
  }

  filterPrice(minPrice, maxPrice) {
    const filteredAds = this.ads.filter(
      (ad) => ad.price >= minPrice && ad.price <= maxPrice
    ); //Filtra gli annunci per prezzo
    console.log(
      `Annunci filtrati per prezzo tra "${minPrice}" e "${maxPrice}":`,
      filteredAds
    ); //Restituisce gli annunci filtrati
    return filteredAds;
  }

  createFavouriteList(referenceKeyUser, referenceKeyAd, sold) {
    const favouriteList = new ModelFavouriteList(
      referenceKeyUser,
      referenceKeyAd,
      sold
    );
    this.favourites = [...this.favourites, favouriteList];
    console.log("Lista dei preferiti creata con successo");
  }

  addFavourite(token, referenceKeyAd) {
    const idUser = this.getUserByToken(token)?.referenceKeyUser; //Verifica il token dell'utente
    if (!idUser) {
      console.log("Token non valido"); //Se il token non è autenticato, restituisce un errore
    } else {
      const newFavourite = new ModelFavourite(idUser, referenceKeyAd); //Salva il valore di "Favourite"
      this.favourites = [...this.favourites, newFavourite]; //Aggiunge un nuovo preferito alla lista
      console.log("Aggiunto ai preferiti");
    }
  }

  modifyFavouriteList(token, favouriteId, newReferenceKeyAd) {
    const idUser = this.getUserByToken(token)?.referenceKeyUser; //Verifica il valore del token dell'utente
    if (idUser) {
      //Trova l'elemento preferito dall'utente
      const favourite = this.favourites.find(
        (fav) =>
          fav.primaryKey === favouriteId && fav.referenceKeyUser === idUser
      );
      if (favourite) {
        //Aggiorna l'elemento preferito dall'utente
        favourite.referenceKeyAd = newReferenceKeyAd;
        console.log("Lista dei preferiti aggiornata con successo");
      } else {
        console.log("Elemento della lista dei preferiti non trovato");
      }
    } else {
      console.log("Token non valido");
    }
  }

  deleteFavouriteList(token, favouriteId) {
    const idUser = this.getUserByToken(token)?.referenceKeyUser; //Verifica il token dell'utente
    if (idUser) {
      //Elimina l'elemento preferito dalla lista
      this.favourites = this.favourites.filter(
        (fav) =>
          fav.primaryKey !== favouriteId || fav.referenceKeyUser !== idUser
      );
      console.log("Elemento della lista dei preferiti eliminato con successo");
    } else {
      console.log("Token non valido");
    }
  }

  isTokenValid(token) {
    const authFound = this.auth.find((auth) => auth.token === token); //Verifica l'autenticazione del token
    return !!authFound; //Restituisce "true" se il token è valido
  }
}

class ModelUser {
  constructor(username, email, password) {
    this.primaryKey = Math.random(); //Identificatore univoco generato casualmente
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

class ModelAd {
  constructor(
    title,
    description,
    category,
    status, //Stato dell'annuncio (ad esempio, disponibile)
    price,
    address,
    phone,
    urlPhoto,
    referenceKeyUser //ID dell'utente che ha creato l'annuncio
  ) {
    this.primaryKey = Math.random();
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = status;
    this.price = price;
    this.address = address;
    this.phone = phone;
    this.urlPhoto = urlPhoto;
    this.referenceKeyUser = referenceKeyUser;
  }
}

class ModelReview {
  constructor(referenceKeyUser, referenceKeyAd, title, description, rating) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser; //ID dell'utente che ha creato la recensione
    this.referenceKeyAd = referenceKeyAd; //Id dell'annuncio segnalato
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.date = new Date();
  }
}

class ModelAuth {
  //Rappresenta un token di identificazione
  constructor(referenceKeyUser) {
    this.token = Math.random().toString(36).substr(2); // Genera un token più leggibile
    this.referenceKeyUser = referenceKeyUser; //ID dell'utente autenticato
  }
}

class ModelReport {
  //Classe che si occupa della segnalazione
  constructor(referenceKeyUser, referenceKeyAd, reason) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
    this.reason = reason; //Ragione per cui viene segnalato
  }
}

class ModelFavourite {
  constructor(referenceKeyUser, referenceKeyAd) {
    this.primaryKey = Math.random(); //Identificatore univoco generato casualmente
    this.referenceKeyUser = referenceKeyUser; //ID dell'utente che ha aggiunto i preferiti
    this.referenceKeyAd = referenceKeyAd; //ID dell'annuncio aggiunto ai preferiti
  }
}

class Device {
  constructor(referenceKeyUser, name, id) {
    this.primaryKey = Math.random(); //Identificatore univoco generato casualmente
    this.id = id; //ID del dispositivo
    this.referenceKeyUser = referenceKeyUser; //ID dell'utente associato al dispositivo
    this.name = name; //Nome assegnato al dispositivo
  }
}

// Salvare il valore di ogni funzione in una costante
const app = new App();
const userToken = app.register("user@example.com", "password");
const loginToken = app.login("user@example.com", "password");
app.modifyUsername(loginToken, "NewUsername");
app.createAd(
  loginToken,
  "Titolo Annuncio",
  "Descrizione Annuncio",
  "Categoria",
  "Disponibile",
  100,
  "Indirizzo",
  "Telefono",
  "URLFoto"
);
const adId = app.ads[0].primaryKey;
app.createReview(
  loginToken,
  "Titolo Recensione",
  adId,
  "Descrizione Recensione",
  5
);
app.addFavourite(loginToken, adId);
app.markAsSold(loginToken, adId, "CompratoreID");
app.registerDevice(loginToken, "DeviceID", "Nome Dispositivo");
