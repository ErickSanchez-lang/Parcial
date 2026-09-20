const API_URL = "http://localhost:8080/api/auth";


// ===============================
// REGISTRO
// ===============================

const registroForm = document.getElementById("registroForm");

if (registroForm) {

    registroForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const contraseña = document.getElementById("contraseña").value;
        const confirmarContraseña =
            document.getElementById("confirmarContraseña").value;

        const mensaje = document.getElementById("mensaje");

        if (contraseña !== confirmarContraseña) {
            mensaje.textContent = "Las contraseñas no coinciden.";
            return;
        }

        try {

            const respuesta = await fetch(
                `${API_URL}/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        nombre: nombre,
                        correo: correo,
                        contraseña: contraseña
                    })
                }
            );

            const datos = await respuesta.json();

            if (respuesta.ok) {

                mensaje.style.color = "#4caf50";
                mensaje.textContent =
                    "Usuario registrado correctamente.";

                registroForm.reset();

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500);

            } else {

                mensaje.style.color = "#ff4655";

                mensaje.textContent =
                    datos.mensaje ||
                    "No se pudo registrar el usuario.";
            }

        } catch (error) {

            mensaje.style.color = "#ff4655";

            mensaje.textContent =
                "No se pudo conectar con el servidor.";
        }
    });
}


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const correo = document.getElementById("correo").value;
        const contraseña =
            document.getElementById("contraseña").value;

        const mensaje = document.getElementById("mensaje");

        try {

            const respuesta = await fetch(
                `${API_URL}/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        correo: correo,
                        contraseña: contraseña
                    })
                }
            );

            const datos = await respuesta.json();

            if (respuesta.ok) {

                mensaje.style.color = "#4caf50";

                mensaje.textContent =
                    datos.mensaje ||
                    "Login exitoso.";

            } else {

                mensaje.style.color = "#ff4655";

                mensaje.textContent =
                    datos.mensaje ||
                    "Correo o contraseña incorrectos.";
            }

        } catch (error) {

            mensaje.style.color = "#ff4655";

            mensaje.textContent =
                "No se pudo conectar con el servidor.";
        }
    });
}
