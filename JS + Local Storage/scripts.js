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
        document.getElementById('clubId').disabled = false;

        var clubId = document.getElementById('clubId').value;
        var clubName = document.getElementById('clubName').value;
        var clubLeague = document.getElementById('clubLeague').value;
        var stadiumName = document.getElementById('stadiumName').value;

        document.getElementById("clubId").disabled = false;

        if (clubId != null | clubId[0] == " ") {
            var club = {
                clubId,
                clubName,
                clubLeague,
                stadiumName
            };

            var listaClubes = JSON.parse(localStorage.getItem("clubes"));
            if (listaClubes == null) {
                var listaClubes = [];
            }

            const flagClubExist = listaClubes.some(clubes => clubes.clubId == clubId);

            if (!flagClubExist || document.getElementById("clubId").disabled == true) {
                if (document.getElementById("clubId").disabled == true) {
                    var listaClubes = listaClubes.filter(club => club.clubId != clubId);
                }

                listaClubes.push(club);

                var clubTemporal = listaClubes.sort((a, b) => a.clubId - b.clubId);
                localStorage.setItem("clubes", JSON.stringify(clubTemporal));

                read();
                cleanInputs();
                alert("Transaccion exitosa");
            } else {
                alert("Ya existe un club con ese ID");
            }

        } else {
            alert("error", "llena los campos");
        }
        console.log(listaClubes);
        document.getElementById("clubId").disabled = false;
    }

    function read() {
        document.getElementById('clubesTable').innerHTML = '';

        const listaClubes = JSON.parse(localStorage.getItem("clubes"));

        if (listaClubes) {
            listaClubes.forEach(club => updateTable(club));
        }
    }

    function updateTable(club) {
        if (club != null) {
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
            cell5.innerHTML = `<button  style="margin-right: 10px;  background-color: #B5484a; "class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick="deleteRow(${club.clubId})">Eliminar</button>`;
            cell6.innerHTML = `<button  style="margin-right: 10px;  background-color: #0AA61B; " class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick="searchRow(${club.clubId})">Modificar</button>`;
        }

    }

    function deleteRow(clubId) {
        const listaClubes = JSON.parse(localStorage.getItem("clubes"));
        var clubTemporal = listaClubes.filter(club => club.clubId != clubId);
        localStorage.setItem("clubes", JSON.stringify(clubTemporal));
        if (clubTemporal.length == 0) { //si no tiene valores se elimina el objeto temporal
            localStorage.removeItem("clubes");
        }
        read();

    }

    function searchRow(clubId) {
        console.log(clubId)
        const listaClubes = JSON.parse(localStorage.getItem("clubes"));
        var club = listaClubes.filter(club => club.clubId == clubId);
        updateR(club[0]);
    }

    function updateR(club) {
        if (club != null) {
            document.getElementById('clubId').value = club.clubId;
            document.getElementById('clubId').disabled = true;
            document.getElementById('clubName').value = club.clubName;
            document.getElementById('clubLeague').value = club.clubLeague;
            document.getElementById('stadiumName').value = club.stadiumName;
        }
    }

    function readTable2(league) {
        // document.getElementById("clubesFilter").innerHTML = '';
        // const listaClubes = JSON.parse(localStorage.getItem("clubes"));
        // // console.log(listaClubes);

        // var filteredClubs = listaClubes.filter(club => club.clubLeague = league);
        // if (filteredClubs) {
        //     filteredClubs.forEach((club) => updateTable2(club));
        // }
        document.getElementById("clubesFilter").innerHTML='';
      
        const lista_Clubes = JSON.parse(localStorage.getItem("clubes"));
        var clubesFiltered=lista_Clubes.filter(club=>club.clubLeague==league);
        if(clubesFiltered)
        {
            clubesFiltered.forEach((club)=>updateTable2(club));
        }
        //console.log(alumnosC)
    
    }

    function updateTable2(club) {
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