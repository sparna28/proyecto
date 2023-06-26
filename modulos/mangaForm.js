const mangaForm = {
  template: `
  <div class="container mt-4">
    <form @submit.prevent="submitForm" class="my-4">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" class="form-control">
      </div>
      
      <div class="mb-3">
        <label for="sinopsis" class="form-label">Sinopsis:</label>
        <textarea id="sinopsis" v-model="sinopsis" class="form-control"></textarea>
      </div>
      
      <div class="mb-3">
        <label for="imagen" class="form-label">Imagen:</label>
        <input type="file" id="imagen" @change="handleImageUpload" class="form-control">
      </div>
      
      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
  `,
  data() {
    return {
      nombre: '',
      sinopsis: '',
      imagen: null
    };
  },
  props: {
    
  },
  mounted() {

  },
  methods: {
    submitForm() {
      const formData = new FormData();
      formData.append('nombre', this.nombre);
      formData.append('sinopsis', this.sinopsis);
      formData.append('imagen', this.imagen);
      
      fetch('http://localhost:8000/api/Manga/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud. Estado: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        // Manejar la respuesta del servidor
        console.log(data);
      })
      .catch(error => {
        // Manejar errores si es necesario
        console.error(error);
      });
    },    
    handleImageUpload(event) {
      this.imagen = event.target.files[0];
    }
  }
};

export default mangaForm;
