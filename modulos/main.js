// Main.js
const Main = {
  template: `
    <div>
      <header>
        <cabecera
          :is-logged="isLogged"
          :is-admin="isAdmin"
          @mostrar-inicio="mostrarInicio"
          @mostrar-registro="mostrarRegistroForm"
          @mostrar-inicio-sesion="mostrarInicioSesionForm"
          @mostrar-anime-form="mostrarAnimeForm"
          @mostrar-manga-form="mostrarMangaForm"
        ></cabecera>
      </header>
      <div>
        <bienvenida
          v-show="mostrarBienvenida"
          :anime="anime"
          :manga="manga"
          @dato-seleccionado="mostrarCAnime"
          @dato_seleccionado="mostrarCMangaId"
        ></bienvenida>
        <contenedorA
          v-show="mostrarAnime"
          :anime="anime"
          :anime-id="animeId"
          :is-logged="isLogged"
          :is-admin="isAdmin"
        ></contenedorA>
        <contenedorM
          v-show="mostrarCManga"
          :manga="manga"
          :manga-id="mangaId"
          :is-logged="isLogged"
          :is-admin="isAdmin"
        ></contenedorM>
        <registro v-show="mostrarRegistro"></registro>
        <inicioSesion v-show="mostrarInicioSesion" @login-success="handleLoginSuccess"></inicioSesion>
        <animeForm v-show="mostrarCrearAnime"></animeForm>
        <mangaForm v-show="mostrarCrearManga"></mangaForm>
        </div>
      <pie></pie>
    </div>
  `,
  data() {
    return {
      anime: [],
      manga: [],
      mostrarBienvenida: true,
      mostrarAnime: false,
      mostrarCManga: false,
      animeId: null,
      mangaId: null,
      mostrarRegistro: false,
      mostrarInicioSesion: false,
      mostrarCrearManga: false,
      mostrarCrearAnime: false,
      user: null,
      isLogged: false,
      isAdmin: false
    };
  },
  mounted() {
    this.cargarDatos();
  },
  methods: {
    cargarDatos() {
      fetch('http://localhost:8000/api/Anime/')
        .then(respuesta => respuesta.json())
        .then(datos => {
          this.anime = datos;
        });
      fetch('http://localhost:8000/api/Manga/')
        .then(respuesta => respuesta.json())
        .then(datos => {
          this.manga = datos;
        });
    },
    logoutUser() {
      // Realizar acciones necesarias para cerrar sesión
      this.isLogged = false; // Actualizar el estado de inicio de sesión
    },

    // Agregar el método para manejar el evento login-success
    handleLoginSuccess(user) {
      this.isLogged = true;
      this.user = user; // Guardar los datos del usuario

      // Verificar si el usuario es administrador y actualizar la propiedad isAdmin
      this.isAdmin = this.user.is_staff;
    },
    mostrarInicio() {
      this.mostrarBienvenida = true;
      this.mostrarAnime = false;
      this.mostrarCManga = false;
      this.mostrarRegistro = false;
      this.mostrarInicioSesion = false;
    },
    mostrarCAnime(id) {
      this.mostrarBienvenida = false;
      this.mostrarAnime = true;
      this.mostrarCManga = false;
      this.animeId = id;
    },
    mostrarCMangaId(id) {
      this.mostrarBienvenida = false;
      this.mostrarAnime = false;
      this.mostrarCManga = true;
      this.mangaId = id;
    },
    mostrarRegistroForm() {
      this.mostrarRegistro = true;
      this.mostrarBienvenida = false;
      this.mostrarAnime = false;
      this.mostrarCManga = false;
      this.mostrarInicioSesion = false;
      this.mostrarCrearManga = false;
      this.mostrarCrearAnime = false;
    },
    mostrarInicioSesionForm() {
      this.mostrarInicioSesion = true;
      this.mostrarRegistro = false;
      this.mostrarBienvenida = false;
      this.mostrarAnime = false;
      this.mostrarCManga = false;
      this.mostrarCrearManga = false;
      this.mostrarCrearAnime = false;
    },
    mostrarAnimeForm() {
      this.mostrarCrearAnime = true;
      this.mostrarBienvenida = false;
      this.mostrarAnime = false;
      this.mostrarCManga = false;
      this.mostrarInicioSesion = false;
      this.mostrarCrearManga = false;
    },
    mostrarMangaForm() {
      this.mostrarCrearManga = true;
      this.mostrarBienvenida = false;
      this.mostrarAnime = false;
      this.mostrarCManga = false;
      this.mostrarInicioSesion = false;
      this.mostrarCrearAnime = false;
    }
  }
};

export default Main;
