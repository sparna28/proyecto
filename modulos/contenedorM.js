const contenedorM = {
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <img :src="mangaSeleccionado ? mangaSeleccionado.imagen : ''" :alt="mangaSeleccionado ? mangaSeleccionado.nombre : ''" class="img-fluid">
        </div>
        <div class="col-md-6">
          <h3>{{ mangaSeleccionado ? mangaSeleccionado.nombre : '' }}</h3>
          <p>{{ mangaSeleccionado ? mangaSeleccionado.sinopsis : '' }}</p>
          <button v-if="isLogged && isAdmin" @click="eliminarElemento">Eliminar</button>
          <button v-if="isLogged && isAdmin" @click="editarElemento">Editar</button>
          <form v-if="mostrarFormulario" @submit.prevent="guardarEdicion">
            <input type="text" v-model="nuevoNombre" required>
            <input type="text" v-model="nuevaSinopsis" required>
            <button type="submit">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      mangaSeleccionado: null,
      mostrarFormulario: false,
      nuevoNombre: '',
      nuevaSinopsis: ''
    };
  },
  props: ['manga', 'mangaId', 'isLogged', 'isAdmin'],
  watch: {
    mangaId(newId) {
      this.mangaSeleccionado = this.manga.find(manga => manga.id === newId);
    },
  },
    methods: {
      eliminarElemento() {
        const url = `http://localhost:8000/api/Manga/${this.mangaId}/`;
  
        fetch(url, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              console.log('Elemento eliminado');
              // Realizar alguna acción adicional después de eliminar el elemento
            } else {
              throw new Error('Error al eliminar el elemento');
            }
          })
          .catch(error => {
            console.error(error);
          });
      },
      editarElemento() {
        this.mostrarFormulario = true; // Mostrar el formulario de edición
        this.nuevoNombre = this.mangaSeleccionado.nombre; // Inicializar los campos del formulario con los datos actuales del manga
        this.nuevaSinopsis = this.mangaSeleccionado.sinopsis;
      },
      guardarEdicion() {
        fetch(`/api/Manga/${this.mangaSeleccionado.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: this.nuevoNombre,
            sinopsis: this.nuevaSinopsis
          })
        })
          .then(response => {
            if (response.ok) {
              // Los cambios se guardaron correctamente
              this.mostrarFormulario = false;
            } else {
              // Hubo un error al guardar los cambios
              console.error('Error al guardar los cambios');
            }
          })
          .catch(error => {
            console.error('Error al guardar los cambios', error);
          });
      },
    }
  };
  
  export default contenedorM;
  