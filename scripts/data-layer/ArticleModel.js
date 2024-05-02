class Article {
  constructor(id, nombre, imagen, descripcion, categoria) {
    this._nombre = nombre;
    this._imagen = imagen;
    this._id = id;
    this._descripcion = descripcion;
    this._categoria = categoria;
  }
}

function mapToArticle(obj) {
  //Desestructurando
  const {
    nombre = "",
    categoria = "",
    imagen = "",
    descripcion = "",
    id = Date.now(),
  } = obj;

  // Realiza el mapeo y crea una instancia de la clase Article
  const mappedArticle = new Article(
    id,
    nombre,
    imagen,
    descripcion,
    categoria
  );

  return mappedArticle;
}
