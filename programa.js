  // Array para almacenar las citas
  let citas = [];
  let citaEditando = null; // Variable para almacenar la cita que se está editando

  // Función para abrir el modal y limpiar el formulario
  function abrirModal(editar = false, cita = null) {
      if (editar && cita) {
          // Llenar el formulario con los datos de la cita seleccionada
          document.getElementById('nombre-paciente').value = cita.nombrePaciente;
          document.getElementById('fecha-cita').value = cita.fechaCita;
          document.getElementById('tipo-ecografia').value = cita.tipoEcografia;
          document.getElementById('hora-cita').value = cita.horaCita;
          document.getElementById('precio').value = cita.precio;
          document.getElementById('estado-paciente').value = cita.estadoPaciente;
          citaEditando = cita; // Guardar la cita que se está editando
      } else {
          // Limpiar el formulario
          document.getElementById('form-cita').reset();
          citaEditando = null; // Reiniciar la variable de edición
      }

      // Abrir el modal
      const modal = new bootstrap.Modal(document.getElementById('modalAgendarCita'));
      modal.show();
  }

  // Función para guardar o actualizar una cita
  document.getElementById('btn-guardar-cita').addEventListener('click', function () {
      // Obtener los valores del formulario
      const nombrePaciente = document.getElementById('nombre-paciente').value;
      const fechaCita = document.getElementById('fecha-cita').value;
      const tipoEcografia = document.getElementById('tipo-ecografia').value;
      const horaCita = document.getElementById('hora-cita').value;
      const precio = document.getElementById('precio').value;
      const estadoPaciente = document.getElementById('estado-paciente').value;

      // Crear un objeto con los datos de la cita
      const cita = {
          nombrePaciente,
          fechaCita,
          tipoEcografia,
          horaCita,
          precio,
          estadoPaciente
      };

      if (citaEditando) {
          // Si se está editando, reemplazar la cita existente
          const index = citas.indexOf(citaEditando);
          citas[index] = cita;
      } else {
          // Si no, agregar la cita al array
          citas.push(cita);
      }

      // Limpiar el formulario y cerrar el modal
      document.getElementById('form-cita').reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalAgendarCita'));
      modal.hide();

      // Actualizar la tabla de citas
      actualizarTablaCitas();
  });

  // Función para actualizar la tabla de citas
  function actualizarTablaCitas() {
      const tablaCitas = document.getElementById('tabla-citas');
      tablaCitas.innerHTML = ''; // Limpiar la tabla

      // Recorrer el array de citas y agregar cada cita a la tabla
      citas.forEach((cita, index) => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
              <td>${cita.nombrePaciente}</td>
              <td>${cita.fechaCita}</td>
              <td>${cita.tipoEcografia}</td>
              <td>${cita.horaCita}</td>
              <td>$${cita.precio}</td>
              <td>${cita.estadoPaciente}</td>
              <td>
                  <button class="btn btn-warning btn-sm" onclick="abrirModal(true, citas[${index}])">Editar</button>
                  <button class="btn btn-danger btn-sm" onclick="borrarCita(${index})">Borrar</button>
              </td>
          `;
          tablaCitas.appendChild(fila);
      });
  }

  // Función para borrar una cita
  function borrarCita(index) {
      citas.splice(index, 1);
      actualizarTablaCitas();
  }

  // Array para almacenar los pacientes
  let pacientes = [];
  let pacienteEditando = null; // Variable para almacenar el paciente que se está editando

  // Función para validar la cédula ecuatoriana
  function validarCedula(cedula) {
      if (cedula.length !== 10 || isNaN(cedula)) {
          return false;
      }
      const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
      let suma = 0;
      for (let i = 0; i < 9; i++) {
          let valor = parseInt(cedula[i]) * coeficientes[i];
          if (valor >= 10) {
              valor = valor - 9;
          }
          suma += valor;
      }
      const digitoVerificador = parseInt(cedula[9]);
      const resultado = (suma % 10 === 0) ? 0 : 10 - (suma % 10);
      return resultado === digitoVerificador;
  }

  // Función para abrir el modal y limpiar el formulario
  function abrirModalPaciente(editar = false, paciente = null) {
      if (editar && paciente) {
          // Llenar el formulario con los datos del paciente seleccionado
          document.getElementById('nombres').value = paciente.nombres;
          document.getElementById('apellidos').value = paciente.apellidos;
          document.getElementById('cedula').value = paciente.cedula;
          document.getElementById('telefono').value = paciente.telefono;
          document.getElementById('email').value = paciente.email;
          document.getElementById('sexo').value = paciente.sexo;
          document.getElementById('fecha-nacimiento').value = paciente.fechaNacimiento;
          document.getElementById('tipo-ecografia').value = paciente.tipoEcografia;
          document.getElementById('precio').value = paciente.precio;
          pacienteEditando = paciente; // Guardar el paciente que se está editando
      } else {
          // Limpiar el formulario
          document.getElementById('form-paciente').reset();
          pacienteEditando = null; // Reiniciar la variable de edición
      }

      // Abrir el modal
      const modal = new bootstrap.Modal(document.getElementById('modalPaciente'));
      modal.show();
  }

  // Función para guardar o actualizar un paciente
  document.getElementById('btn-guardar-paciente').addEventListener('click', function () {
      // Obtener los valores del formulario
      const nombres = document.getElementById('nombres').value;
      const apellidos = document.getElementById('apellidos').value;
      const cedula = document.getElementById('cedula').value;
      const telefono = document.getElementById('telefono').value;
      const email = document.getElementById('email').value;
      const sexo = document.getElementById('sexo').value;
      const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
      const tipoEcografia = document.getElementById('tipo-ecografia').value;
      const precio = document.getElementById('precio').value;

      // Validar la cédula
      if (!validarCedula(cedula)) {
          document.getElementById('cedula-error').style.display = 'block';
          return;
      } else {
          document.getElementById('cedula-error').style.display = 'none';
      }

      // Crear un objeto con los datos del paciente
      const paciente = {
          nombres,
          apellidos,
          cedula,
          telefono,
          email,
          sexo,
          fechaNacimiento,
          tipoEcografia,
          precio
      };

      if (pacienteEditando) {
          // Si se está editando, reemplazar el paciente existente
          const index = pacientes.indexOf(pacienteEditando);
          pacientes[index] = paciente;
      } else {
          // Si no, agregar el paciente al array
          pacientes.push(paciente);
      }

      // Limpiar el formulario y cerrar el modal
      document.getElementById('form-paciente').reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalPaciente'));
      modal.hide();

      // Actualizar la tabla de pacientes
      actualizarTablaPacientes();
  });

  // Función para actualizar la tabla de pacientes
  function actualizarTablaPacientes() {
      const tablaPacientes = document.getElementById('tabla-pacientes');
      tablaPacientes.innerHTML = ''; // Limpiar la tabla

      // Recorrer el array de pacientes y agregar cada paciente a la tabla
      pacientes.forEach((paciente, index) => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
              <td>${paciente.nombres}</td>
              <td>${paciente.apellidos}</td>
              <td>${paciente.cedula}</td>
              <td>${paciente.telefono}</td>
              <td>${paciente.email}</td>
              <td>${paciente.sexo}</td>
              <td>${paciente.fechaNacimiento}</td>
              <td>${paciente.tipoEcografia}</td>
              <td>$${paciente.precio}</td>
              <td>
                  <button class="btn btn-warning btn-sm" onclick="abrirModalPaciente(true, pacientes[${index}])">Editar</button>
                  <button class="btn btn-danger btn-sm" onclick="borrarPaciente(${index})">Borrar</button>
              </td>
          `;
          tablaPacientes.appendChild(fila);
      });
  }

  // Función para borrar un paciente
  function borrarPaciente(index) {
      pacientes.splice(index, 1);
      actualizarTablaPacientes();
  }





  // Credenciales válidas (solo para demostración)
const usuarioValido = "admin";
const contraseñaValida = "admin123";

// Manejar el envío del formulario de login
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe

    // Obtener los valores del formulario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validar las credenciales
    if (username === usuarioValido && password === contraseñaValida) {
        // Guardar el estado de autenticación en localStorage
        localStorage.setItem('autenticado', 'true');
        // Redirigir a la página principal
        window.location.href = "index.html";
    } else {
        // Mostrar mensaje de error
        document.getElementById('login-error').style.display = 'block';
    }
});