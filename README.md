# Tasknote

CLI para anotar to-do (cosas por hacer).



## Características

:sparkles: 107 KB de tamaño

:sparkles: Buen estilo

:sparkles: Comandos cortos

:sparkles: Almacenamiento de tareas con `sqlite3` 



## ¿Cómo instalarla?

### Requerimientos

- Tener [node.js](https://nodejs.org/) instalado.

### Pasos

- Paso 1:
  - Descargar los archivos de este repositorio.
  - Hacer una carpeta para Tasknote (ponle el nombre que desees).
  - Descomprime los archivos en la carpeta.
- Paso 2:
  - Copia la ruta de la carpeta creada.
  - Abre la línea de comandos (cmd) o la terminal de tu preferencia y ejecuta el comando `cd` seguido de la ruta copiada, así: `cd <Ruta>` (sin los <>)
- Paso 3:
  - Ejecutar el comando `npm install`, esto instalará todas las dependencias de Tasknote.
- Paso 4:
  - Ejecutar el comando `node . --setup`, esto configurará la base de datos para que esté lista para guardar tareas.
- Paso 5:
  - Disfrutar del CLI, abajo tendrás la lista de opciones (comandos) disponibles.
  - Cada vez que quieras usar el CLI, solo repite el paso 3 para acceder a la carpeta y empezar a usar Tasknote.



## Opciones (comandos)

Los comandos del CLI, como verán, algunos estarán separados por comas, esto significa que tienen varios "alias" para ser ejecutados.

### -t, --task

El comando principal, a través de este comando puedes crear tareas, se usa así: `node . --task Darle estrella al repositorio de Tasknote.`

### -c, --check

A través de este comando puedes marcar tareas como completadas/no completadas, se usa así: `node . --check 7896` (reemplaza `7896` por la ID de la tarea que quieras marcar)

Este comando funciona como un `toggler`, si la tarea ya está marcada como completa, se marca como no completada y viceversa.

### -d, --delete

A través de este comando puedes eliminar tareas, se usa así: `node . --delete 7896` (reemplaza `7896` por la ID de la tarea que quieras eliminar)

### --setup

A través de este comando puedes configurar la base de datos, es el primero que debes ejecutar al instalar Tasknote (ver paso 4).



## Advertencia

El tamaño mostrado en características es **solo** el tamaño del código, las dependencias oscilan entre los 17.5 y 20.8 MB.
