export default class Taller {
    constructor(taller) {
      this._taller = taller.taller;
      this._Ocupados = taller.ocupados;
      this._fIncial = taller.fIncial;
      this._fTermino = taller.fTermino;
      this._disponibles = taller.disponibles;
      this._horas = taller.horas;

      this._fIncial = new Date(taller.fIncial);
      this._fTermino = new Date(taller.fTermino);
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

    get ocupados(){
      return this._Ocupados;
    }
  
  
    get fIncial() {
      return this._fIncial;
    }

    get fTermino() {
        return this._fTermino;
    }

    get disponibles(){
        return this._disponibles;
    }

    get horas(){
        return this._horas;
    }
  
    _getNumberAs2Digits(number) {
      if(number < 0) {
      return "0"+number;
    }
  
    return number;
  }
  
    getFIncialForDate() {
      let { fIncial } = this;
  
      let date = fIncial.getFullYear() +
       "-" + 
       this._getNumberAs2Digits(fIncial.getMonth()) +
        "-" +
        this._getNumberAs2Digits(fIncial.getDay());
  
      console.log(date);
      return date;
    }
    getFIncialAsString() {
        let date =
          this._fIncial.getDate() +
          "/" +
          this._months[this._fIncial.getMonth()] +
          "/" +
          this._fIncial.getFullYear();
    
        return date;
      }

    getFTerminoForDate() {
        let { fTermino } = this;
    
        let date1 = fTermino.getFullYear() +
         "-" + 
         this._getNumberAs2Digits(fTermino.getMonth()) +
          "-" +
          this._getNumberAs2Digits(fTermino.getDay());
    
        console.log(date1);
        return date1;
      }

    getFTerminoAsString() {
        let date1 =
          this._fTermino.getDate() +
          "/" +
          this._months[this._fTermino.getMonth()] +
          "/" +
          this._fTermino.getFullYear();
    
        return date1;
      }
    }