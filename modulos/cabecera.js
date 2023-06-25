// cabecera.js
const cabecera = {
  template: `
    <div class="container">
      <header class="d-flex flex-wrap align-items-center justify-content-start justify-content-md-between py-3 mb-4 border-bottom text-start">  
        <h1 class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none" @click="mostrarInicio">Inicio</h1>  
        
        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li v-if="isLogged && isAdmin">
            <button class="nav-link px-2 link-dark" @click="mostrarAnimeForm">Crear Anime</button>
          </li>
          <li v-if="isLogged && isAdmin">
            <button class="nav-link px-2 link-dark" @click="mostrarMangaForm">Crear Manga</button>
          </li>
        </ul>

        <div class="col-md-3 text-end">
          <button v-if="!isLogged" type="button" class="btn btn-outline-primary me-2" @click="mostrarInicioSesion">Iniciar Sesión</button>
          <button v-if="!isLogged" type="button" class="btn btn-outline-primary me-2" @click="mostrarRegistro">Registrarse</button>
          <button v-if="isLogged" type="button" class="btn btn-outline-primary me-2" @click="logoutUser">Cerrar Sesión</button>
        </div>
      </header>
    </div>
  `,
  data() {
    return {

    }
  },
  props: {
    isLogged: {
      type: Boolean,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  mounted() {

  },
  methods: {
    mostrarInicio() {
      this.$emit('mostrar-inicio');
    },
    mostrarRegistro() {
      this.$emit('mostrar-registro');
    },
    mostrarInicioSesion() {
      this.$emit('mostrar-inicio-sesion');
    },
    mostrarAnimeForm() {
      this.$emit('mostrar-anime-form'); // Emitir el evento con el nombre correcto
    },
    mostrarMangaForm() {
      this.$emit('mostrar-manga-form'); // Emitir el evento con el nombre correcto
    },

    
    logoutUser() {
      const access_token = localStorage.getItem('access_token');
      console.log(access_token)

      if (access_token) {
        fetch('http://localhost:8000/api/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
          },
        })
        .then(response => {
          console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la respuesta del servidor');
          }
        })
        .then(data => {
          console.log(data);
          this.isLogged = false;
        })
        .catch(error => {
          console.error(error);
        });
      } else {
        console.error('No se encontró el token de acceso en el almacenamiento local');
      }
    }    
  }
};

export default cabecera;
