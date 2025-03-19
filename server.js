// Ruta para validar el estado del residente y manejar entregas o paquetería
app.post('/validar-entrega', (req, res) => {
    const { departamento, tipo } = req.body;

    // Leer lista de morosos
    fs.readFile('./data/morosos.json', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo de morosos:', err);
            res.status(500).send('Error al validar el estado del residente.');
        } else {
            const morosos = JSON.parse(data).morosos;
            const esMoroso = morosos.includes(departamento);

            if (esMoroso) {
                const mensaje =
                    tipo === 'delivery'
                        ? `El departamento ${departamento} es moroso. El residente debe bajar por su pedido.`
                        : `El departamento ${departamento} es moroso. No se puede recibir el paquete.`;
                res.status(403).send({ mensaje, notificar: true });
            } else {
                const mensaje =
                    tipo === 'delivery'
                        ? `Pedido entregado al departamento ${departamento}.`
                        : `Paquete recibido para el departamento ${departamento}.`;
                res.status(200).send({ mensaje, notificar: false });
            }
        }
    });
});
