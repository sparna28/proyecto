const bienvenida = {
    template: `
      <div>
        <h4 class="text-center font-weight-bold">Animes</h4>
        <div id="carousel" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row">
                <div class="col" v-for="anime in animesFiltrados1" :key="anime.id">
                  <img :src="anime.imagen" :alt="anime.nombre" @click="enviarDatoA(anime.id)">
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row">
                <div class="col" v-for="anime in animesFiltrados2" :key="anime.id">
                  <img :src="anime.imagen" :alt="anime.nombre" @click="enviarDatoA(anime.id)">
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row">
                <div class="col" v-for="anime in animesFiltrados3" :key="anime.id">
                  <img :src="anime.imagen" :alt="anime.nombre" @click="enviarDatoA(anime.id)">
                </div>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          </a>
          <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
          </a>
        </div>

        <h4 class="text-center font-weight-bold">Mangas</h4>
        <div id="carousel" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row">
                <div class="col" v-for="manga in mangasFiltrados1" :key="manga.id">
                  <img :src="manga.imagen" :alt="manga.nombre" @click="enviarDatoM(manga.id)">
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row">
                <div class="col" v-for="manga in mangasFiltrados2" :key="manga.id">
                  <img :src="manga.imagen" :alt="manga.nombre" @click="enviarDatoM(manga.id)">
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row">
                <div class="col" v-for="manga in mangasFiltrados3" :key="manga.id">
                  <img :src="manga.imagen" :alt="manga.nombre" @click="enviarDatoM(manga.id)">
                </div>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          </a>
          <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    `,
    data() {
      return {
        estilo: {},
      };
    },
    props: {
      anime: {
        type: Array,
        default: [],
      },
      manga: {
        type: Array,
        default: [],
      },
    },
    mounted() {},
    methods: {
      enviarDatoA(animeId) {
        this.$emit('dato-seleccionado', animeId);
      },
      enviarDatoM(mangaId) {
        this.$emit('dato_seleccionado', mangaId);
      },
    },
    computed: {
      animesFiltrados1() {
        return this.anime.slice(0, 5); // Obtener solo los primeros 5 elementos del array
      },
      animesFiltrados2() {
        return this.anime.slice(5, 10);
      },
      animesFiltrados3() {
        return this.anime.slice(10, 15);
      },
      mangasFiltrados1() {
        return this.manga.slice(0, 5);
      },
      mangasFiltrados2() {
        return this.manga.slice(5, 10);
      },
      mangasFiltrados3() {
        return this.manga.slice(10, 15);
      },
    },
  };
  
export default bienvenida;
  