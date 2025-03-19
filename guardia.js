async function consultarPlacas() {
    const placas = document.getElementById('placas').value;
    const resultadoDiv = document.getElementById('resultadoPlacas');

    if (!placas) {
        resultadoDiv.style.color = 'red';
        resultadoDiv.innerText = 'Por favor, ingrese un número de placas válido.';
        return;
    }

    try {
        const response = await fetch('config/placas_residentes.json');
        const data = await response.json();
        const registro = data.residentes.find((item) => item.placa === placas);

        if (registro) {
            const departamento = registro.departamento === "Sin asignar" ? "No asignado" : registro.departamento;
            resultadoDiv.style.color = 'green';
            resultadoDiv.innerText = `Placas ${placas} autorizadas. Departamento: ${departamento}.`;
        } else {
            resultadoDiv.style.color = 'red';
            resultadoDiv.innerText = `Placas ${placas
