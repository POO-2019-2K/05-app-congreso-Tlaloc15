import Alumnos from "./Alumnos.js";
import Clase from "./Clase.js";

class Main {
  constructor() {
    let clase = new Clase(
      document.querySelector("#clase"),
      document.querySelector("#info")
    );

    document.querySelector("#btnVolver").addEventListener("click", () => {
      location.href='Congreso.html';
    })


    document.querySelector("#btnAdd2").addEventListener("click", () => {
      let form = document.querySelector("#form");

      if (form.checkValidity() === true) {
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let sbirthday = document.querySelector("#birthday").value;
        sbirthday = sbirthday.split("-");

        let birthday = new Date(sbirthday[0], sbirthday[1] - 1, sbirthday[2]);
        

        let objAlumno = {
          name: name,
          email: email,
          birthday: birthday
          

        };

        let alumno = new Alumnos(objAlumno);

        clase.addAlumnos(alumno);
      }

      form.classList.add("was-validated");
    });
  }
}

let m = new Main();