async function converToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      //se ejecutara una vez que la convesion halla finalizado en "readAsDataURL"
      resolve(e.target.result); // la conversion estara disponible en el result
    };

    reader.onerror = function (e) {
      reject(error);
    };

    reader.readAsDataURL(file); //es asincrono
  });
}

async function procesarImagen(inputImagen) {
  try {
    let base64URL = "";
    if (inputImagen.size <= 1024 * 1024) {
      base64URL = await converToBase64(inputImagen);
    } else {
      throw new Error("Image size must low than 1 MB");
    }
    return base64URL;
  } catch (error) {
    console.error("Error al convertir a base64:", error);
    alert(error);
  }
}

loadImageInFormulario = (inputImagen, imagenFormulario) => {
  const file = inputImagen.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      imagenFormulario.src = reader.result;
    };
    reader.onerror = function (error) {
      console.error("Error al cargar la imagen:", error.message);
    };
  }
};
