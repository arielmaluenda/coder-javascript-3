
//ANIMAL SPONSORSHIP SYSTEM
//DATA

const animales = [
  {id:1, nombre: "Esperanza", especie: "bovino"},
  {id:2, nombre: "Dharma", especie: "porcino"},
  {id:3, nombre: "Newton", especie: "porcino"},
  {id:4, nombre: "Gaspar", especie: "bovino"},
  {id:5, nombre: "Susie", especie: "porcino"},
  {id:6, nombre: "Emito", especie: "caprino"},
  {id:7, nombre: "Lily", especie: "caprino"},
  {id:8, nombre: "Blue", especie: "caprino"},
  {id:9, nombre: "Manuel", especie: "ovino"},
  {id:10, nombre: "Estelita", especie: "ovino"},
]  

const compromisos = [
  {id:1, monto: 1000, animal: 1, donante: 1},
  {id:2, monto: 500, animal: 6, donante: 3},
  {id:3, monto: 20000, animal: 3, donante: 4},
  {id:4, monto: 1000, animal: 6, donante: 1},
]

const donantes = [
  {id:1, nombre: "Matías Maluenda", email: "matias@gmail.com"},
  {id:2, nombre: "Nicolás de la Reguera", email: "nicolas@gmail.com"},
  {id:3, nombre: "Martín Prado", email: "martin@gmail.com"},
  {id:4, nombre: "Olivia Paz", email: "olivia@gmail.com"},
]

//Identificar país de usuario
let pais = document.getElementById("pais")

const visitaDesde = async () => {
  const response = await fetch("https://api.ipstack.com/check?access_key=170ee832fd7d83b620765378c3d75c4f")
  const data = await response.json();
  pais.append(data.country_name +" "+ data.location.country_flag_emoji)
  }

visitaDesde();

//PASO 1
let locationTrue = document.getElementById("visitaDesdeSi");
let locationFalse = document.getElementById("visitaDesdeNo");
let step1 = document.getElementById("paso1");
let step1b = document.getElementById("paso1b");

locationTrue.addEventListener( "click", ()=> {
  locationTrue.classList.remove("btn-outline-success");
  locationTrue.classList.add("btn-success");
  //step1.className = "hidden"
  step1b.className = "hidden"
});

locationFalse.addEventListener( "click", () => {
  locationFalse.classList.remove("btn-outline-danger");
  locationFalse.classList.add("btn-danger");
  locationTrue.classList.add("btn-outline-success");
  step1b.className = "show"
});



//PASO 2
let choseCow = document.getElementById("eligeVaca");
let chosePig = document.getElementById("eligeCerdo");
let choseHen = document.getElementById("eligeGallina");
let choseGoat = document.getElementById("eligeCabra");
let choseSheep = document.getElementById("eligeOveja");
let choseDonkey = document.getElementById("eligeBurro");

choseCow.addEventListener("click", ()=> {
  choseCow.classList.add("btn-primary");
  choseCow.classList.remove("btn-outline-primary");
})



//Funciones CRUD
const agregarCompromiso = ( monto, idAnimal, idDonante) => {
  let objeto = {
    id: compromisos.length + 1,
    monto: monto,
    animal: idAnimal,
    donante: idDonante  }
  compromisos.push(objeto);
}

const obtenerNombreAnimal = (idAnimal) => {
  let animal = animales.find((item) => item.id === idAnimal);
  return animal.nombre
}

const obtenerNombreDonante = (idDonante) => {
  let donante = donantes.find( (item) => item.id === idDonante);
  return donante.nombre
}

const listarCompromisos = () => {
  let respuesta = "";
  compromisos.forEach( item => {
    let objetos = {
      id: item.id,
      monto: item.monto,
      nombre: obtenerNombreAnimal( item.animal),
      donante: obtenerNombreDonante( item.donante)
    }
    respuesta += `${objetos.id}: ${objetos.donante} colabora con $${objetos.monto} para ${objetos.nombre} \n`
  })
  return respuesta
}

const listarDonantes = () => {
  let objetos = donantes.map( item => item.nombre);
    return objetos;
}

const listarDonantesDe = ( idAnimal ) => {
  let objetos = compromisos.filter( item => item.animal === idAnimal )
  console.log( objetos )
}

const listarAnimales = () => {
  let objetos = animales.map( item => item.nombre);
  return objetos;  
}

const totalDonaciones = () => {
  let total = compromisos.reduce( (acum, item) => acum + item.monto, 0 )
  return total; 
}

const borrarCompromiso = (idCompromiso) => {
  compromisos.splice( idCompromiso -1,  1 );
  console.log( compromisos)
}

// let run = true

// while (run) {
//   modo = Number(prompt("Sistema para gestionar sponsorhips para refugios de animales :)\n Elige la operación que quieres realizar:\n\n 1. Ver animales \n 2. Ver donantes \n 3. Ver compromisos \n 4. Ver total de ingreso mensual comprometido "))
//   switch(modo){
//     case 1:
//       alert("Animales: \n"+ listarAnimales());
//       break;
//     case 2:
//       alert("Donantes: \n"+ listarDonantes());
//       break;
//     case 3:
//       alert("Compromisos: \n"+ listarCompromisos());
//       break;
//     case 4:
//       alert( "Suma total de donaciones comprometidas: $" + totalDonaciones() );
//     default:
//       run = false;
//   }
// }