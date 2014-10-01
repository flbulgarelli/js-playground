var contenedor = {
  entraPaquete: function(paquete){
     return paquete.volumen() <= this.volumenDisponible(); 
  }
  volumenDisponible: function() {
    return this.volumenTotal - this.volumenOcupado;
  }
}
