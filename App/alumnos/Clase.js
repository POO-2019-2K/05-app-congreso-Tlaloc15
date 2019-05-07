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
let lsAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
if (lsAlumnos === null) {
    return;
}
lsAlumnos.forEach((e, index) => {
    e.birthday = new Date(e.birthday);

    this._addToTable(new Alumnos(e));
});
}


_addToTable(alumno) {
let row = this._tableClase.insertRow(-1);
//En la tabla grande 
let cellName = row.insertCell(0);
let cellEmail = row.insertCell(1);
let cellBirthday = row.insertCell(2);
let cellAge = row.insertCell(3);
row.insertCell(4);
row.insertCell(5);

cellName.innerHTML = alumno.name;
cellEmail.innerHTML = alumno.email;
cellBirthday.innerHTML = alumno.getBirthdayAsString();
cellAge.innerHTML = alumno.getAge();

this._numAlumnos++;

this._tableInfo.rows[0].cells[1].innerHTML = this._numAlumnos;

let objAlumno = {
          name: alumno.name,
          email: alumno.email,
          birthday: alumno.birthday
          
};

this._alumnos.push(objAlumno);
}

_findEmail(email){//encontrar el nombre
let found = -1 

this._alumnos.forEach((e, index)=>{
    if(e.email === email)
    {
    found = index;
    return;
    }
});
return found;
}

addAlumnos(alumno) {
let found = this._findEmail(alumno.email);
if (found >= 0){
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