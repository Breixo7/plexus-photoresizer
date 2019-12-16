# Plexus-photoresizer

## Arquitectura API-REST

Se ha dividido la aplicación en los siguientes modulos.

### Archivo /routes/index.js
Para recibir las llamadas a la API desde front-end, así tenemos un archivo donde gestionarlas y es facil añadir rutas nuevas. Se importado sanitizer para limpiar la posible ejecucion de codigo malicioso.

### Archivo /tools/photo-resizer.js
A modo de controlador, se ha creado este archivo donde están las siguientes funciones que controlan los procesos. 

- taskInfo: Controla la llamada get, recibiendo un taskId, buscando en el archivo taskCompleted y devolviendo la informacion de la task si esta ha sido encontrada o en su defecto sino ha sido encontrada devuelve un KO.

- resizer: Controla la llamada post, recibiendo una url como parámetro y realizando las siguientes funciones :

 -- Genera nombre del archivo codificandolo en MD5. Usando la librería md5.
 
 -- Prepara la informacion de la imagen y de la tarea para su posterior guardado en disco.
 
 -- Guarda la informacion de la imagen en el json imagesLog.
 
 -- Guarda la informacion de la tarea en el json tasksLog.
 
 -- Crea la ruta requerida para el guardado de las imagenes escaladas usando mkdirp, que las crea de manera recursiva y procede al escalado de  las imágenes en 1024 y 800 de width para su guardado en sus respectivas rutas.
 
 -- Una vez finalizado este proceso, procede a salvar su nuevo status en el archivo tasksCompleted.
 
 ### Archivo /tests/test.js
 Para realizar los test unitarios se ha creado este archivo donde estan recogidas las pruebas sobre los dos endpoints, tanto cuando el parametro es correcto como cuando no es correcto.
 
 
 ## Ejecucion del proyecto
 
 En caso de usar nodemon -> nodemon ./bin/www sino vale con ejecutar -> npm start.
 Para la ejecucion de los test unitarios -> npm test
 
 





