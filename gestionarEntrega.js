async function gestionarEntrega(tipo) {
    const departamento = document.getElementById('departamento').value;
    const mensajeDiv = document.getElementById('resultadoEntrega');

    try {
        const response = await fetch('config/morosos.json');
        const data = await response.json();
        const esMoroso = data.morosos.includes(departamento);

        if (esMoroso) {
            const mensaje =
                tipo === 'delivery'
                    ? `El departamento ${departamento} está en la lista de morosos. El residente debe bajar por su pedido.`
                    : `El departamento ${departamento} está en la lista de morosos. No se puede recibir el paquete.`;

            mensajeDiv.style.color = 'red';
            mensajeDiv.innerText = mensaje;

            enviarNotificacionResidente(departamento, mensaje);
        } else {
            const mensaje =
                tipo === 'delivery'
                    ? `Pedido entregado al departamento ${departamento}.`
                    : `Paquete recibido para el departamento ${departamento}.`;

            mensajeDiv.style.color = 'green';
            mensajeDiv.innerText = mensaje;

            registrarEntrada(departamento, tipo);
        }
    } catch (error) {
        console.error('Error al gestionar la entrega:', error);
        mensajeDiv.innerText = 'Error al validar el estado del departamento.';
    }
}

function enviarNotificacionResidente(departamento, mensaje) {
    console.log(`Notificación enviada al departamento ${departamento}: ${mensaje}`);
    // Aquí puedes integrar la funcionalidad para enviar notificaciones reales
}

async function registrarEntrada(departamento, tipo) {
    const nuevaEntrada = {
        fecha: new Date().toISOString(),
        departamento,
        tipo
    };

    try {
        const response = await fetch('http://localhost:3000/entradas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaEntrada)
        });

        if (response.ok) {
            console.log('Entrada registrada:', nuevaEntrada);
        } else {
            console.error('Error al registrar la entrada:', response.statusText);
        }
    } catch (error) {
        console.error('Error al conectar con el backend:', error);
    }
}
