import Talleres from "./Employee.js";

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

    this._addToTable(new Talleres(e));
});
}



_addToTable(talleres) {
let row = this._tableCongreso.insertRow(-1);

let cellName = row.insertCell(0);
let cellFInicial = row.insertCell(1);
let cellFTermino = row.insertCell(2);
row.insertCell(3);
row.insertCell(4);

cellName.innerHTML = talleres.name;
cellFInicial.innerHTML = talleres.getFechaInicialAsString();
cellFTermino.innerHTML = talleres.getFechaFinalAsString();



this._numTalleres++; 

this._tableInfo.rows[0].cells[1].innerHTML = this._numTalleres;

let objTaller = {
    name: talleres.name,
    fInicial: talleres.fInicial,
    fTermino: talleres.fTermino
};

this._talleres.push(objTaller);
}

}