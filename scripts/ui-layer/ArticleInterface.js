class UserInterface {
  constructor(appLogic) {
    this.appLogic = appLogic;

    this.container_formulario = document.querySelector(".container-formulario");
    this.container_formulario_editar = document.querySelector(
      ".container-formulario-editar"
    );

    this.icon_add = document.querySelector(".icon-add");
    this.itemList = document.getElementById("tbody");
    this.tfilas = tbody.getElementsByTagName("tr");

    inputImagen.addEventListener(
      "change",
      () => loadImageInFormulario(inputImagen, imagenFormulario) //la idea es no ejecutar la funcion al enviarle, por eso se hace uso del ()=>
    );

    inputImagenEditar.addEventListener(
      "change",
      () => loadImageInFormulario(inputImagenEditar, imagenFormularioEditar)
    );

    filtroCategoria.addEventListener("click", (e) => this.filterByCategory(e));

    // ELEMENTOS PARA MOSTRAR EL FORMULARIO DE AGREGAR ELEMENTOS
    this.icon_add.addEventListener("click", this.showAddForm);
    btnSalir.addEventListener("click", this.showAddForm);
    btnLimpiar.addEventListener("click", this.limpiarTabla);
    formulario.addEventListener("submit", this.handleFormSubmit);
    imageClose.addEventListener("click", this.showZoomForm);

    btnSalirEditar.addEventListener("click", this.showEditForm);
    formularioEditar.addEventListener("submit", this.handleFormEditSubmit);
    busqueda.addEventListener("keyup", this.betterSearch);

    this.renderItems();
  }

  limpiarTabla = () => {
    if (confirm("¿Estás seguro de que quieres borrar todo?")) {
      this.appLogic.removeAll();
      this.renderItems();
    }
  };

  betterSearch = () => {
    const filtro = busqueda.value.toLowerCase();
    const filtrados = this.appLogic.getItemsByFilter(filtro);
    this.renderItems("all", filtrados);
  };

  //Ya no lo uso
  search = () => {
    const filtro = busqueda.value.toLowerCase();

    for (let i = 0; i < this.tfilas.length; i++) {
      const fila = this.tfilas[i];
      const textos = fila
        .getElementsByTagName("td")[0]
        .textContent.toLowerCase();

      if (textos.includes(filtro)) {
        fila.setAttribute("style", `display:"block"`);
      } else {
        fila.setAttribute("style", "display:none");
      }
    }
  };

  showZoomForm = () => {
    containerCard.classList.toggle("visible");
  };

  showAddForm = () => {
    this.container_formulario.classList.toggle("visible");
    inputImagen.value = "";
    imagenFormulario.src = "";
  };

  showEditForm = () => {
    this.container_formulario_editar.classList.toggle("visible");
    inputImagen.value = "";
    imagenFormulario.src = "";
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target; //otra manera sin usar el "id"
    let base64URL = "";

    const selectFile = inputImagen.files[0];
    if (selectFile) {
      base64URL = await procesarImagen(selectFile);
    }

    const newArticle = {
      nombre: form.nombre.value,
      categoria: categoria.value,
      // form.categoria.options[form.categoria.selectedIndex].textContent,
      imagen: base64URL,
      descripcion: form.descripcion.value,
    };

    if (newArticle) {
      this.appLogic.addItem(newArticle);
      this.renderItems();
      formulario.reset();
      imagenFormulario.src = "";
    }
  };

  handleFormEditSubmit = async (event) => {
    event.preventDefault();
    let base64URL = "";

    const selectFile = inputImagenEditar.files[0];
    if (selectFile) {
      base64URL = await procesarImagen(selectFile);
    } else {
      base64URL = imagenFormularioEditar.src;
    }

    const newArticle = {
      nombre: nombreEditar.value, //sin usar el id
      categoria: categoriaEditar.value,
      imagen: base64URL,
      descripcion: descripcionEditar.value,
    };

    if (newArticle) {
      this.appLogic.updateItem(identificador.value, newArticle);
      this.renderItems();
      formularioEditar.reset();
      this.showEditForm();
    }
  };

  handleRemoveItemClick = (id) => {
    this.appLogic.removeItem(id);
    this.renderItems();
  };

  handleEditItemClick = (id) => {
    this.container_formulario_editar.classList.toggle("visible");
    const element = this.appLogic.getItemById(id);
    identificador.value = element._id;
    nombreEditar.value = element._nombre;
    categoriaEditar.value = element._categoria;
    imagenFormularioEditar.src = element._imagen;
    descripcionEditar.value = element._descripcion;
  };

  handleZoomItemClick = (id) => {
    this.showZoomForm();
    const element = this.appLogic.getItemById(id);
    imagenZoom.src = element._imagen;
    categoriaZoom.textContent = element._categoria;
    nombreZoom.textContent = element._nombre;
    descripcionZoom.value = element._descripcion;
  };

  renderItems = (category = "all", itemsFiltrados = null) => {
    let items;
    if (!itemsFiltrados) {
      items = this.appLogic.getItemsByCategory(category);
    } else {
      items = itemsFiltrados;
    }
    if (items.length > 0) {
      this.itemList.innerHTML = items
        .map((item) => {
          return `
        <tr>
          
          <td>
            <div class="contenedor-td">${item._nombre}</div>
          </td>
          <td>${item._categoria}</td>
          <td>
              <img class="litle-image" src="${
                item._imagen ? item._imagen : "/assets/images/duolingo.png"
              }" onerror="this.src='/assets/images/duolingo.png'">
          </td>
          <td>
          <img class="icon" src="assets/images/eye535193.png" alt="" onclick = "appUI.handleZoomItemClick(${
            item._id
          })" >
          </td>
          <td>
          <img class="icon" src="assets/images/edit.png" alt="" onclick = appUI.handleEditItemClick(${
            item._id
          })>
          </td>
          <td>
          <img  class="icon" src="assets/images/delete484611.png" alt="" onclick = "appUI.handleRemoveItemClick(${
            item._id
          })" >
          </td>
        </tr>
    
       `;
        })
        .join("");
    } else {
      console.log("no hay elementos");
      this.itemList.innerHTML = `
      <tr>
      <td colspan="7" id="tablaVacio"> 
          No se encotraron valores
       </td>
      </tr>
      `;
    }
  };

  filterByCategory = (e) => {
    let categoriaSeleccionada = e.target.selectedOptions[0].value;
    this.renderItems(categoriaSeleccionada);
  };
}

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const appLogic = new AppLogic(itemService);
const appUI = new UserInterface(appLogic);
