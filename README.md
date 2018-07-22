# SEEK-checkout-ads

Existem duas formas para executar a aplicação:

> Instalação via NPM
> Instalação via Docker

# Instalação via NPM

Suba uma instância do mongodb em localhost na porta 27017. 
Os modulos do node por serem muito pesados foram colocados no arquivo **.gitignore**.
Para instalá-los e rodar a aplicação back-end utilize os comandos:

```
$ cd back
$ npm install
$ node server.js
```

# Instalação via Docker

Instale o docker no seu ambiente e execute os comandos abaixo:

```
$ cd back
$ docker-compose --no-cache
$ docker-compose up
```

# Testando aplicação

Para rodar os testes unitários da aplicação utilize o comando: 
```
$ cd back
$ npm test
```