// inicioSesion.js
const inicioSesion = {
  template: `
    <div class="container mt-4">
      <h2 class="mb-4">Iniciar Sesión</h2>
      <form @submit.prevent="loginUser">
        <div class="mb-3">
          <label for="username" class="form-label">Nombre de Usuario:</label>
          <input type="text" id="username" v-model="username" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña:</label>
          <input type="password" id="password" v-model="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>

  `,
  data() {
    return {
      username: '',
      password: ''
    };
  },
  props: {

  },
  mounted() {

  },
  methods: {
    loginUser() {
      fetch('http://localhost:8000/api/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
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
          // Procesar la respuesta del servidor
          console.log(data);
          // Acceder a los datos del usuario en la respuesta
          const userData = data.user;
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          // Emitir el evento login-success con los datos del usuario
          this.$emit('login-success', userData);
        })
        .catch(error => {
          // Manejar el error
          console.error(error);
        });
    }
  }
};

export default inicioSesion;
