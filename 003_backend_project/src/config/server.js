const express = require('express')


const configureServer = async (app) => {
  // Configuração do body parser de Express para receber dados no formato JSON
  await app.use(express.json());

}

module.exports = {
  configureServer
}