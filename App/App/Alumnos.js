export default class Alumnos {
    constructor(alumno) {
      this._taller = alumno.taller;
      this._ocupados = alumno.ocupados
      this._name = alumno.name;
      this._email = alumno.email;
      this._birthday = alumno.birthday;

      this._birthday = new Date(alumno.birthday);
      this._months = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ];
    }
    
    get taller() {
      return this._taller;
    }

    get name() {
      return this._name;
    }

    get ocupados() {
      return this._ocupados;
    }
  
    get email() {
      return this._email;
    }

    get birthday() {
        return this._birthday;
    }

    _getNumberAs2Digits(number) {
      if(number < 0) {
      return "0"+number;
    }
  
    return number;
  }
  
    getBirthdayForDate() {
      let { birthday } = this;
  
      let date = birthday.getFullYear() +
       "-" + 
       this._getNumberAs2Digits(birthday.getMonth()) +
        "-" +
        this._getNumberAs2Digits(birthday.getDay());
  
      console.log(date);
      return date;
    }
    getBirthdayAsString() {
        let date =
          this._birthday.getDate() +
          "/" +
          this._months[this._birthday.getMonth()] +
          "/" +
          this._birthday.getFullYear();
    
        return date;
      }

      getAge() {
        let oneDay = 24 * 60 * 60 * 1000;
        let oneYear = oneDay * 365;
        let differenceMs = new Date() - this._birthday;
        let age = Math.trunc(differenceMs / oneYear);
    
        return age;
      }

    }