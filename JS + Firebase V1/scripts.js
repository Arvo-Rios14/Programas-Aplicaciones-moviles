// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIx_rIriyvN1b8f32N8kDr9g_wsnDscmU",
  authDomain: "fir-js-b455a.firebaseapp.com",
  projectId: "fir-js-b455a",
  databaseURL: "https://fir-js-b455a-default-rtdb.firebaseio.com/",
  storageBucket: "fir-js-b455a.appspot.com",
  messagingSenderId: "491124673298",
  appId: "1:491124673298:web:4447ce9633e4f88ffe81cb",
  measurementId: "G-V1RZMWT2F4"
};
firebase.initializeApp(firebaseConfig);


function cleanInputs() {
  document.getElementById('clubId').value = '';
  document.getElementById('clubName').value = '';
  document.getElementById('clubLeague').value = '';
  document.getElementById('stadiumName').value = '';
  document.getElementById('labelCL').hidden = false;
}

function setLeagueValue(league) {
  document.getElementById('clubLeague').value = league;
  document.getElementById('labelCL').hidden = true;
}

function createClub() {
  document.getElementById('clubId').disabled=false;

  var clubId = document.getElementById('clubId').value;
  var clubName = document.getElementById('clubName').value;
  var clubLeague = document.getElementById('clubLeague').value;
  var stadiumName = document.getElementById('stadiumName').value;

  if (clubId != null | clubId[0] == " ") {
    var club = {
      clubId,
      clubName,
      clubLeague,
      stadiumName
    };

    firebase.database().ref('Clubes/' + clubId).update(club).then(() => {
      cleanInputs();
    }).then(() => {
      read();
    });
    alert("Exito", "Exito");

  } else {
    alert("error", "llena los campos");
  }
}

function read() {
  document.getElementById('clubesTable').innerHTML='';

  var referencia = firebase.database().ref('Clubes');

  referencia.on("child_added", function (registro) {
    var objeto = registro.val();
    updateTable(objeto);
  });
}

function updateTable(club) {
  var table = document.getElementById('clubesTable');
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  cell1.innerHTML = club.clubId;
  cell2.innerHTML = club.clubLeague;
  cell3.innerHTML = club.clubName;
  cell4.innerHTML = club.stadiumName;
  cell5.innerHTML= `<button  style="margin-right: 10px;  background-color: #B5484a; "class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick="deleteRow(${club.clubId})">Eliminar</button>`;
  cell6.innerHTML= `<button  style="margin-right: 10px;  background-color: #0AA61B; " class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick="searchRow(${club.clubId})">Modificar</button>`;

}

function deleteRow(clubId){
  console.log(clubId);
  firebase.database().ref('Clubes/' + clubId).set(null).then(() => {
    read();
  }).then(()=>{
     alert("Eliminado", "Eliminado correctamente");
  }, error=>{
    alert("ERROR", "ERROR EN LA ELIMINACION");
  });
}

function searchRow(clubId){
  console.log(clubId)
  var ref = firebase.database().ref('Clubes/' + clubId);
  ref.on('value', function(registro) {
    updateR(registro.val());
  });
}

function updateR(club){
  if(club!=null)
  {
    document.getElementById('clubId').value=club.clubId;
    document.getElementById('clubId').disabled=true;
    document.getElementById('clubName').value=club.clubName;
    document.getElementById('clubLeague').value=club.clubLeague;
    document.getElementById('stadiumName').value=club.stadiumName;
  }
}

function readTable2(league){
  document.getElementById("clubesFilter").innerHTML='';


  var ref = firebase.database().ref("Clubes");
  ref.orderByChild("clubLeague").equalTo(league).on("child_added", function(registro) {
      updateTable2(registro.val());
  });
}

function updateTable2(club){
  var table = document.getElementById("clubesFilter"); 
  
  //creamos un nuevo elemento en la tabla en la ultima posicion
  var row = table.insertRow(-1);

  //Insertamos cada una de las celdas/columnas del registro
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  
  //Agregamos la informacion a cada una de las columnas del registro
  cell1.innerHTML = club.clubId;
  cell2.innerHTML = club.clubLeague;
  cell3.innerHTML = club.clubName;
  cell4.innerHTML = club.stadiumName;
 
}