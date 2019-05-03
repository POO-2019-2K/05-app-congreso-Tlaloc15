import Taller from "./Talleres.js";

export default class Congreso {
  constructor(tableCongreso, tableInfo) {
    this._tableCongreso = tableCongreso;
    this._tableInfo = tableInfo;
    this._numTalleres = 0;

this._talleres= [];

//localStorage.removeItem("Talleres");
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

    this._addToTable(new Taller(e));
});
}


_addToTable(taller) {
let row = this._tableCongreso.insertRow(-1);
//En la tabla grande 
let cellName = row.insertCell(0);
let cellFInicial = row.insertCell(1);
let cellFTermino = row.insertCell(2);
let cellDisponible = row.insertCell(3);
let cellHoras = row.insertCell(4);
row.insertCell(5);
row.insertCell(6);

cellName.innerHTML = taller.name;
cellFInicial.innerHTML = taller.getFIncialAsString();
cellFTermino.innerHTML = taller.getFTerminoAsString();
cellDisponible.innerHTML = taller.disponibles;
cellHoras.innerHTML = taller.horas;

let objTaller = {
          name: taller.name,
          fIncial: taller.fIncial,
          fTermino: taller.fTermino,
          disponibles: taller.disponibles,
          horas: taller.horas
};

this._talleres.push(objTaller);
}

_findName(name){//encontrar el nombre
let found = -1 

this._talleres.forEach((e, index)=>{
    if(e.name === name)
    {
    found = index;
    return;
    }
});
return found;
}

addTaller(taller) {
let found = this._findName(taller.name);
if (found >= 0){
    swal.fire({
    type: "error",
    title: "error",
    text: "El taller ya esta registrado"
    });
    return;
}
this._addToTable(taller);
localStorage.setItem("Talleres", JSON.stringify(this._talleres));
}
}