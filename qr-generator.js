function generarQR() {
    const placa = document.getElementById('placa').value;
    const sinPlaca = document.getElementById('sinPlaca').checked;
    const departamento = document.getElementById('departamento').value;
    const nombre = document.getElementById('nombre').value;

    const datosQR = {
        placa: sinPlaca ? "Sin placa" : placa,
        departamento: departamento,
        nombre: nombre
    };

    const qrCodeDiv = document.getElementById('qrcode');
    qrCodeDiv.innerHTML = ""; // Limpiar el QR anterior

    const qrCode = new QRCode(qrCodeDiv, {
        text: JSON.stringify(datosQR),
        width: 200,
        height: 200
    });

    alert("Código QR generado con éxito.");
}
