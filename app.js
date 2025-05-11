const express = require('express');

const path = require('path');

const mysql = require('mysql');

const app = express();

const port = 3000;

const conection = mysql.createConnection({
    host: 'data.ca7oss6qu6bb.us-east-1.rds.amazonaws.com',
    user: 'yon',
    password: 'kokopato8383',
    database: 'test'
});

conection.connect((problema) => {
    if (problema) {
        console.log('Error de connectarse a la base de datos :', problema.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:3000`);
});

app.use(express.static(path.join(__dirname, 'pagina_principal')));

app.use(express.urlencoded({ extended: true }));


app.post('/guardar_reporte', (request, response) => {
    const {reporte,donde, categoria} = request.body;
    const sql = 'INSERT INTO REPORTES (reporte, donde, categoria) VALUES (?, ?, ?)';
    conection.query(sql,[reporte , donde , categoria], (problema, reslt)=>{
        if(problema) throw problema;
        console.log('Reporte guardado en la base de datos');
        response.redirect('/');
    });

});
