const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer'); // Para manejar imágenes
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Ruta para verificar si un departamento es moroso
app.post('/verificar-moroso', (req, res) => {
    const { departamento } = req.body;

    fs.readFile('./data/morosos.json', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo de morosos:', err);
            res.status(500).send('Error al verificar el departamento.');
        } else {
            const morosos = JSON.parse(data).morosos;
            if (morosos.includes(departamento)) {
                res.status(403).send({ mensaje: `El departamento ${departamento} está en la lista de morosos.` });
            } else {
                res.status(200).send({ mensaje: `El departamento ${departamento} no está en la lista de morosos.` });
            }
        }
    });
});

// Ruta para registrar paquetes recibidos
app.post('/registrar-paqueteria', upload.single('foto'), (req, res) => {
    const { nombreGuardia, paqueteria, nombreResidente, departamento } = req.body;
    const foto = req.file ? req.file.path : null;

    fs.readFile('./data/registro_paqueteria.json', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo de paquetería:', err);
            res.status(500).send('Error al registrar el paquete.');
        } else {
            const paquetes = JSON.parse(data);
            const nuevoPaquete = {
                nombreGuardia,
                paqueteria,
                nombreResidente,
                departamento,
                foto,
                fechaRecepcion: new Date().toISOString()
            };

            paquetes.push(nuevoPaquete);

            fs.writeFile('./data/registro_paqueteria.json', JSON.stringify(paquetes, null, 2), (err) => {
                if (err) {
                    console.error('Error escribiendo en el archivo de paquetería:', err);
                    res.status(500).send('Error al registrar el paquete.');
                } else {
                    res.status(201).send('Paquete registrado exitosamente.');
                }
            });
        }
    });
});

// Ruta para registrar entregas de paquetes
app.post('/registrar-entrega', (req, res) => {
    const { fechaEntrega, horaEntrega, quienRecibe } = req.body;

    fs.readFile('./data/registro_entregas.json', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo de entregas:', err);
            res.status(500).send('Error al registrar la entrega.');
        } else {
            const entregas = JSON.parse(data);
            const nuevaEntrega = {
                fechaEntrega,
                horaEntrega,
                quienRecibe
            };

            entregas.push(nuevaEntrega);

            fs.writeFile('./data/registro_entregas.json', JSON.stringify(entregas, null, 2), (err) => {
                if (err) {
                    console.error('Error escribiendo en el archivo de entregas:', err);
                    res.status(500).send('Error al registrar la entrega.');
                } else {
                    res.status(201).send('Entrega registrada exitosamente.');
                }
            });
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
