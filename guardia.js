async function registrarPaqueteria() {
    const form = document.getElementById('formPaqueteria');
    const formData = new FormData(form);

    try {
        const response = await fetch('http://localhost:3000/registrar-paqueteria', {
            method: 'POST',
            body: formData
        });

        const mensaje = response.ok ? 'Paquete registrado exitosamente.' : 'Error al registrar el paquete.';
        document.getElementById('resultadoPaqueteria').innerText = mensaje;
    } catch (error) {
        console.error('Error al registrar el paquete:', error);
        document.getElementById('resultadoPaqueteria').innerText = 'Error al registrar el paquete.';
    }
}

async function registrarEntrega() {
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    const horaEntrega = document.getElementById('horaEntrega').value;
    const quienRecibe = document.getElementById('quienRecibe').value;

    try {
        const response = await fetch('http://localhost:3000/registrar-entrega', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fechaEntrega, horaEntrega, quienRecibe })
        });

        const mensaje