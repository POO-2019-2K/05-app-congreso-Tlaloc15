import Alumnos from "./Alumnos.js";

export default class Clase {
  constructor(tableClase, tableInfo) {
    this._tableClase = tableClase;
    this._tableInfo = tableInfo;
    this._numAlumnos = 0;

this._alumnos= [];

//localStorage.removeItem("alumnos");
this._initTables();
}

_initTables() {
let lsTalleres = JSON.parse(localStorage.getItem("Talleres"));
if (lsTalleres === null) {
    return;
}
lsTalleres.forEach((e, index) => {
    e.fInicial = new Date(e.fInicial);
    e.fTermino = new Date(e.fTermino);

    this._addToTable(new Alumnos(e));
});
}


_addToTable(alumno) {
let row = this._tableClase.insertRow(-1);
//En la tabla grande 
let cellName = row.insertCell(0);
let cellFInicial = row.insertCell(1);
let cellFTermino = row.insertCell(2);
row.insertCell(3);
row.insertCell(4);

cellName.innerHTML = alumno.name;
cellFInicial.innerHTML = alumno.getFIncialAsString();
cellFTermino.innerHTML = alumno.getFTerminoAsString();

let objAlumno = {
          name: alumno.name,
          email: alumno.email,
          birthday: alumno.sbirthday,
          
};

this._alumnos.push(objAlumno);
}

_findName(name){//encontrar el nombre
let found = -1 

this._alumnos.forEach((e, index)=>{
    if(e.name === name)
    {
    found = index;
    return;
    }
});
return found;
}

addAlumnos(alumno) {
let found = this._findName(alumno.name);
if (found >= 0){
    swal.fire({
    type: "error",
    title: "error",
    text: "El taller ya esta registrado"
    });
    return;
}
this._addToTable(alumno);
localStorage.setItem("alumnos", JSON.stringify(this._alumnos));
}
}