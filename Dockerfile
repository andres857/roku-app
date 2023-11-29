# Utiliza la imagen oficial de Node.js como imagen base
FROM node:18.16.0-bullseye

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo 'package.json' y 'package-lock.json' (si está disponible)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos y directorios restantes al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecutará tu aplicación
EXPOSE 5005

# El comando para ejecutar tu aplicación
CMD ["npm", "start"]
