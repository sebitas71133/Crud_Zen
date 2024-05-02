
class ItemRepository {
  constructor() {
    this.items = [];
    this._data = JSON.parse(localStorage.getItem("array")) || data;
    this.getDataLocal();
  }

  getDataLocal(){

  }

  getItems() {
    // console.log(this._data);
    return this._data ? this._data : [];
    // return [...this.items];
  }

  getItemsByCategory(categoria = "all") {
    //si es all devolver todo... programar
    if (categoria === "all") {
      return this.getItems();
    } else {
      return this._data.filter((item) => item._categoria === categoria);
    }
  }

  getItemsByFilter(filtro) {
    return this._data.filter( (item) => (item._nombre.toLowerCase()).includes(filtro))
  }

  getItemById(id) {
    return this._data.filter((item) => item._id === id);
  }

  addItem(newArticle) {
    this._data.push(newArticle);
    localStorage.setItem(`array`, JSON.stringify(this._data));
    return "ok";
  }

  updateItem(id, newArticle) {
    this._data.forEach((item) => {
      if (item._id === parseInt(id)) {
        item._nombre = newArticle.nombre;
        item._imagen = newArticle.imagen;
        item._descripcion = newArticle.descripcion;
        item._categoria = newArticle.categoria;
      }
    });

    localStorage.setItem(`array`, JSON.stringify(this._data));
  }

  removeItem(id) {
    this._data = this._data.filter((item) => item._id !== id);
    localStorage.setItem("array", JSON.stringify(this._data));
  }

  removeAll() {
    localStorage.setItem(`array`, JSON.stringify([]));
    this._data = JSON.parse(localStorage.getItem("array"));
  }
}
