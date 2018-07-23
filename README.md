# SEEK-checkout-ads

A aplicação é composta por dois ambientes, front e back-end.
Cada uma delas fica em uma pasta separada na raiz do projeto.

## Back-end

O projeto "back-end" fica na pasta [back](./back), e existem duas formas para executá-lo:

> Instalação via NPM
> Instalação via Docker

### Instalação via NPM

Suba uma instância do mongodb em localhost na porta 27017. 
Os modulos do node por serem muito pesados foram colocados no arquivo **.gitignore**.
Para instalá-los e rodar a aplicação back-end utilize os comandos:

```
$ cd back
$ npm install
$ node server.js
```

### Instalação via Docker

Instale o docker no seu ambiente e execute os comandos abaixo:

```
$ cd back
$ docker-compose --no-cache
$ docker-compose up
```

### Testando aplicação

Para rodar os testes unitários da aplicação utilize o comando: 
```
$ cd back
$ npm test
```

### Tecnologias utilizadas

Para a aplicação back-end foi utilizada a linguagem NodeJs com o framework Express.
O banco de dados escolhido foi o MongoDB por apresentar uma ótima performance comparado aos bancos relacionais, e também por não haver necessidades de utilizar bancos relacionais.
Devido ao tempo, foi utilizado javascript em vez de typescript. Porém utilizar typescript no Node permite uma organização melhor por causa da tipagem, e também uma detecção maior dos erros.
O padrão de autenticação utilizado foi via token JWT.


## Front-end

O projeto "front-end" fica na pasta [front](./front), e existem duas formas para executá-lo:

> Instalação via NPM
> Instalação via Docker

### Instalação via NPM

Tenha a aplicação "back-end" rodando. Caso contrário a aplicação "front" não irá funcionar.
É importante utilizar a mesma forma de instalação para os dois projetos. **Ou docker, ou npm. Nunca os dois juntos**
Para instalar os módulos do angular e rodar a aplicação front-end utilize os comandos:

```
$ cd front
$ npm install
$ npm start
```

### Instalação via Docker

(Ainda não implementada)
Instale o docker no seu ambiente e execute os comandos abaixo:

```
$ cd front
$ docker-compose --no-cache
$ docker-compose up
```

### Credenciais de acesso

As credenciais de acesso para fazer o login na aplicação são:

> **email**: testuser@onlyfortests.testing
> **senha**: 123456

### Tecnologias utilizadas

Na aplicação front-end foi utilizado o Angular na versão 6 com typescript, SASS e bootstrap v4.
Por falta de tempo, algumas refatorações não foram feitas.
O mesmo **payload** está sendo utilizado no front e back para manter um padrão nas "requests" e "responses". Porém nem todos os "endpoints" tiveram o payload implementado.
