const registro={
    template:
    `
      <div class="container mt-4">
        <h2 class="mb-4">Registro de Usuario</h2>
        <form @submit.prevent="registerUser">
          <div class="mb-3">
            <label for="username" class="form-label">Nombre de Usuario:</label>
            <input type="text" id="username" v-model="username" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" v-model="email" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña:</label>
            <input type="password" id="password" v-model="password" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary">Registrar</button>
        </form>
      </div>
  
    `,
    data(){
        return {
            username: '',
            email: '',
            password: ''
        };
    },
    
    props:{

    },
    mounted(){
    },
    methods:{
        registerUser() {
            fetch('http://localhost:8000/api/register/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: this.username,
                email: this.email,
                password: this.password
              })
            })
            .then(response => response.json())
            .then(data => {
              // Procesar la respuesta del servidor
              console.log(data);
            })
            .catch(error => {
              // Manejar el error
              console.error(error);
            });
        }
    }
}

export default registro;