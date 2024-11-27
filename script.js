document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario");
    const limpiarButton = document.getElementById("limpiar");

    const regexNombreApellido = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,20}$/; // Solo letras y espacios, longitud 3-20
    const regexDNI = /^[0-9]{8}[A-Za-z]$/; // Formato 8 dígitos + 1 letra
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato de correo básico
    const regexMotivo = /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s,.;()]{1,255}$/; // Alfanuméricos y símbolos permitidos

    const validarNombre = () => {
        const nombre = document.getElementById("nombre").value.trim();
        const nombreError = document.getElementById("error-nombre");
        if (!regexNombreApellido.test(nombre)){
            nombreError.style.display = "block";
            nombreError.textContent = "El nombre debe tener entre 3 y 20 caracteres alfabéticos.";
            return false;
        }
        nombreError.style.display = "none";
        return true;
    };

    const validarApellidos = () => {
        const apellidos = document.getElementById("apellidos").value.trim();
        const apellidosError = document.getElementById("error-apellidos");
        if (!regexNombreApellido.test(apellidos)){
            apellidosError.style.display = "block";
            apellidosError.textContent = "Los apellidos deben tener entre 3 y 20 caracteres alfabéticos.";
            return false;
        }
        apellidosError.style.display = "none";
        return true;
    };

    const validarDNI = () => {
        const dni = document.getElementById("dni").value.trim();
        const dniError = document.getElementById("error-dni");
        const letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";
        if (!regexDNI.test(dni)){
            dniError.style.display = "block";
            dniError.textContent = "El DNI debe tener 8 dígitos seguidos de una letra.";
            return false;
        }
        const numero = parseInt(dni.slice(0, 8), 10);
        const letra = dni[8].toUpperCase();
        if (letrasDNI[numero % 23] !== letra){
            dniError.style.display = "block";
            dniError.textContent = "El DNI no es válido.";
            return false;
        }
        dniError.style.display = "none";
        return true;
    };

    const validarCorreo = () => {
        const email = document.getElementById("email").value.trim();
        const emailError = document.getElementById("error-email");
        if (!regexEmail.test(email)){
            emailError.style.display = "block";
            emailError.textContent = "Debe ingresar un correo electrónico válido.";
            return false;
        }
        emailError.style.display = "none";
        return true;
    };

    const validarMotivo = () => {
        const motivo = document.getElementById("motivo").value.trim();
        const motivoError = document.getElementById("error-motivo");
        if (!regexMotivo.test(motivo) || motivo.length === 0){
            motivoError.style.display = "block";
            motivoError.textContent = "El motivo debe tener un máximo de 255 caracteres y no puede estar vacío..";
            return false;
        }
        motivoError.style.display = "none";
        return true;
    };

    const validarFormulario = () => {
        const nombreValido = validarNombre();
        const apellidosValido = validarApellidos();
        const dniValido = validarDNI();
        const correoValido = validarCorreo();
        const motivoValido = validarMotivo();
        return nombreValido && apellidosValido && dniValido && correoValido && motivoValido;
    };

    limpiarButton.addEventListener("click", () => {
        form.reset();
        document.querySelectorAll(".error-message").forEach((div) => div.style.display = "none");
    });

    document.getElementById("nombre").addEventListener("blur", validarNombre);
    document.getElementById("apellidos").addEventListener("blur", validarApellidos);
    document.getElementById("dni").addEventListener("blur", validarDNI);
    document.getElementById("email").addEventListener("blur", validarCorreo);
    document.getElementById("motivo").addEventListener("blur", validarMotivo);
});