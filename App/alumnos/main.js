import Alumnos from "./Alumnos.js";
import Clase from "./Clase.js";

class Main {
  constructor() {
    let clase = new Clase(
      document.querySelector("#clase"),
      document.querySelector("#info")
    );

    document.querySelector("#btnAdd").addEventListener("click", () => {
      let form = document.querySelector("#form");

      if (form.checkValidity() === true) {
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let birthday = document.querySelector("#birthday").value;
        birthday = birthday.split("-");

        let sbirthday = new Date(birthday[0], birthday[1] - 1, birthday[2]);
        

        let objAlumno = {
          name: name,
          email: email,
          birthday: sbirthday
          

        };

        let alumno = new Alumnos(objAlumno);

        clase.addAlumnos(alumno);
      }

      form.classList.add("was-validated");
    });
  }
}

let m = new Main();