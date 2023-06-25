const contenedorA = {
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <img :src="animeSeleccionado ? animeSeleccionado.imagen : ''" :alt="animeSeleccionado ? animeSeleccionado.nombre : ''" class="img-fluid">
        </div>
        <div class="col-md-6">
          <h3>{{ animeSeleccionado ? animeSeleccionado.nombre : '' }}</h3>
          <p>{{ animeSeleccionado ? animeSeleccionado.sinopsis : '' }}</p>
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
      animeSeleccionado: null,
      mostrarFormulario: false,
      nuevoNombre: '',
      nuevaSinopsis: ''
    };
  },
  props: ['anime', 'animeId', 'isLogged', 'isAdmin'],
  watch: {
    animeId(newId) {
      this.animeSeleccionado = this.anime.find(anime => anime.id === newId);
    },
  },
  methods: {
    eliminarElemento() {
      const elementoId = 123; // Reemplaza con el ID del elemento que deseas eliminar
      const url = `http://localhost:8000/api/eliminar_anime/${elementoId}/`;
    
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token') // Incluye el token de acceso en la cabecera si es necesario
        },
      })
        .then(response => {
          console.log(response)
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
      this.nuevoNombre = this.animeSeleccionado.nombre; // Inicializar los campos del formulario con los datos actuales del anime
      this.nuevaSinopsis = this.animeSeleccionado.sinopsis;
    },
    guardarEdicion() {
      const url = `http://localhost:8000/api/editar_anime/${this.animeId}/`;
  
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify({
          titulo: this.nuevoNombre,
          descripcion: this.nuevaSinopsis
        })
      })
      .then(response => {
        if (response.ok) {
          console.log('Edición guardada');
          // Realizar alguna acción adicional después de guardar la edición
        } else {
          throw new Error('Error al guardar la edición');
        }
      })
      .catch(error => {
        console.error(error);
      });
    },
  }
};

export default contenedorA;
