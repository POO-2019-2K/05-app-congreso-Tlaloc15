import Congreso from "./Congreso.js";
import Taller from "./Talleres.js";

class Main {
  constructor() {
    let congreso = new Congreso(
      document.querySelector("#congreso"),
      document.querySelector("#info")
    );

    document.querySelector("#btnAdd").addEventListener("click", () => {
      let form = document.querySelector("#form");

      if (form.checkValidity() === true) {
        let name = document.querySelector("#name").value;
        let sfIncio = document.querySelector("#fIncio").value;
        sfIncio = sfIncio.split("-");
        let sfTermino = document.querySelector("#fTermino").value;
        sfTermino = sfTermino.split("-");

        let fIncial = new Date(sfIncio[0], sfIncio[1] - 1, sfIncio[2]);
        let fTermino = new Date(sfTermino[0], sfTermino[1] - 1, sfTermino[2]);

        let disponibles = document.querySelector("#disponibles").value;
        let horas = document.querySelector("#horas").value;

        let objTaller = {
          name: name,
          fIncial: fIncial,
          fTermino: fTermino,
          disponibles: disponibles,
          horas: horas

        };

        let taller = new Taller(objTaller);

        congreso.addTaller(taller);
      }

      form.classList.add("was-validated");
    });
  }
}

let m = new Main();

