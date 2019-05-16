import Taller from "./Talleres.js";

export default class Congreso {
    constructor(tableCongreso, tableInfo) {
        this._tableCongreso = tableCongreso;
        this._tableInfo = tableInfo;
        this._numTalleres = 0;
        this._disponibles = 0;
        this._Ocupados = 0;

        this._talleres = [];
        this._iTaller = [];

        //localStorage.removeItem("talleres");
        this._initTables();
    }

    _initTables() {
        let lsTalleres = JSON.parse(localStorage.getItem("talleres"));
        if (lsTalleres === null) {
            return;
        }
        lsTalleres.forEach((e, index) => {
            e.fInicial = new Date(e.fInicial);
            e.fTermino = new Date(e.fTermino);

            this._addToTable(new Taller(e));
        });
    }


    _agregarAlumnos(row, taller) {

    let btnParticipantes = document.createElement("input");
    btnParticipantes.type = "button";
    btnParticipantes.value = "Agregar Alumno";
    btnParticipantes.className = "btn btn-success";
    btnParticipantes.addEventListener("click", () => {
        let nombretaller = 
      {
        taller: taller.taller,
        disponibles: taller.disponibles,
      };
        this._iTaller.push(nombretaller);
        localStorage.setItem("iTaller", JSON.stringify(this._iTaller));
        location.href='Alumnos.html';
      })
    row.cells[6].innerHtml = "";
    row.cells[6].appendChild(btnParticipantes);
    }

    _addDeleteToRow(row) {

        let btnDelete = document.createElement("input");
        btnDelete.type = "button";
        btnDelete.value = "Borrar";
        btnDelete.className = "btn btn-danger";
        btnDelete.addEventListener("click", () => {
            let posicion = this._findName(taller.taller);
            this._talleres[posicion] = objTaller;

            let Lalumnos = JSON.parse(localStorage.getItem("Alumnos"));
            
            let foundAt = -1; //solo lo encuentra desde el 0 en adelante. Por eso se inicializa como -1
          
          Lalumnos.forEach((e, index) => {
          
          if (e.id === localStorage.getItem("iTalleres")) {
            
            foundAt = index;
            Swal.fire({
              type: "error",
              title: "Error",
              text: "No puedes eliminar el taller si aún tiene participantes" 
              
            });
          }if(e.id != localStorage.getItem("iTalleres")){      
            Swal.fire({
              type: "success",
              title: "Eliminado",
              text: "eliminación exitosa" 
            });
            this._talleres.splice(posicion, 1);
           localStorage.setItem("talleres", JSON.stringify(this._talleres));
           return;
          }

            
        });
        
         return foundAt;
        })

    row.cells[7].innerHTML = "";
    row.cells[7].appendChild(btnDelete);

}


    _addToTable(taller) {

        this._disponibles = Number(taller.disponibles);
        this._disponibles = this._disponibles - this._Ocupados;

        let row = this._tableCongreso.insertRow(-1);
        //En la tabla grande 
        let cellName = row.insertCell(0);
        let cellFInicial = row.insertCell(1);
        let cellFTermino = row.insertCell(2);
        let cellDisponible = row.insertCell(3);
        let cellOcupados = row.insertCell(4);
        let cellHoras = row.insertCell(5);
        row.insertCell(6);
        row.insertCell(7);
        

        cellName.innerHTML = taller.taller;
        cellFInicial.innerHTML = taller.getFIncialAsString();
        cellFTermino.innerHTML = taller.getFTerminoAsString();
        cellDisponible.innerHTML = taller.disponibles;
        cellOcupados.innerHTML = this._Ocupados;
        cellHoras.innerHTML = taller.horas;

        this._agregarAlumnos(row, taller);
        this._addDeleteToRow(row, taller);
        

        this._numTalleres++;
        this._tableInfo.rows[0].cells[1].innerHTML = this._numTalleres;



        let objTaller = {
            taller: taller.taller,
            fIncial: taller.fIncial,
            fTermino: taller.fTermino,
            disponibles: taller.disponibles,
            horas: taller.horas
        };

        this._talleres.push(objTaller);
    }

    _findName(taller) { //encontrar el nombre
        let found = -1

        this._talleres.forEach((e, index) => {
            if (e.taller === taller) {
                found = index;
                return;
            }
        });
        return found;
    }

    addTaller(taller) {
        let found = this._findName(taller.taller);
        if (found >= 0) {
            swal.fire({
                type: "error",
                title: "error",
                text: "El taller ya esta registrado"
            });
            return;
        }
        this._addToTable(taller);
        localStorage.setItem("talleres", JSON.stringify(this._talleres));
    }
}