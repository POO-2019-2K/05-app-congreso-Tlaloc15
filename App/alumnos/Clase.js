import Alumnos from "./Alumnos.js";

export default class Clase {
    constructor(tableClase, tableInfo) {
        this._tableClase = tableClase;
        this._tableInfo = tableInfo;
        this._nameTaller = 0;
        this._numAlumnos = 0;
        this._disponibles = 0;
        this._Ocupados = 0;

        this._alumnos = [];

        //localStorage.removeItem("alumnos");
        this._initTables();
    }

    _initTables() {

        let taller = JSON.parse(localStorage.getItem("iTaller"));
    taller.forEach((t, index) => {
      this._nameTaller = t.taller;
      this._disponibles = Number(t.disponibles);
    })
        let lsAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        if (lsAlumnos === null) {
            return;
        }
        lsAlumnos.forEach((e, index) => {
            e.birthday = new Date(e.birthday);

            this._addToTable(new Alumnos(e));
        });
    }

    _addDeleteToRow(row) {

        let btnDelete = document.createElement("input");
        btnDelete.type = "button";
        btnDelete.value = "Eliminar";
        btnDelete.className = "btn btn-danger"

        row.cells[5].innerHTML = "";
        row.cells[5].appendChild(btnDelete);
    }
    _limpiador()
  {
    localStorage.removeItem("Alumnos");
    console.log("Alumnos");
  }

    _addToTable(alumno) {
        let row = this._tableClase.insertRow(-1);
        //En la tabla grande 
        let cellTaller = row.insertCell(0);
        let cellName = row.insertCell(1);
        let cellEmail = row.insertCell(2);
        let cellBirthday = row.insertCell(3);
        let cellAge = row.insertCell(4);
        row.insertCell(5);
        row.insertCell(6);

        cellTaller.innerHTML = this._nameTaller;
        cellName.innerHTML = alumno.name;
        cellEmail.innerHTML = alumno.email;
        cellBirthday.innerHTML = alumno.getBirthdayAsString();
        cellAge.innerHTML = alumno.getAge();

        this._addDeleteToRow(row, alumno);

        this._numAlumnos++;

        this._tableInfo.rows[0].cells[1].innerHTML = this._numAlumnos;

        this._tableInfo.rows[1].cells[1].innerHTML = this._disponibles;

        this._tableInfo.rows[2].cells[1].innerHTML = this._Ocupados;

        let objAlumno = {
            taller: this._nameTaller,
            name: alumno.name,
            email: alumno.email,
            birthday: alumno.birthday,
            ocupados: this._Ocupados

        };

        this._alumnos.push(objAlumno);
    }

    _findEmail(email) { //encontrar el nombre
        let found = -1

        this._alumnos.forEach((e, index) => {
            if (e.email === email) {
                found = index;
                return;
            }
        });
        return found;
    }

    addAlumnos(alumno) {
        let found = this._findEmail(alumno.email);
        if (found >= 0) {
            swal.fire({
                type: "error",
                title: "error",
                text: "El alumno ya esta registrado"
            });
            return;
        }
        this._addToTable(alumno);
        localStorage.setItem("Alumnos", JSON.stringify(this._alumnos));
    }
}