# Plataforma de Conexão Voluntária Local

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Descrição 
Aplicação de match de ação comunitária entre voluntários e ONGs, desenvolvida com TypeScript, Bun.js, Express.js e MongoDB (em Docker). O sistema permite registrar e autenticar usuários, cadastrar e atualizar perfis de ONGs e realizar o match entre voluntários e oportunidades, facilitando o engajamento em causas locais.

O projeto foi desenvolvido como parte do processo avaliativo da disciplina de Programação Web Back-End, ministrada pelo Professor Maurício Barreto Marçal de Carvalho, na UNIFAN, com o objetivo de consolidar conhecimentos teóricos e práticos adquiridos durante o curso.

## Tecnologias

**Back End:** TypeScript, Bun.js, Express.js, MongoDB

## Instalação e Execução

#### Clonando o repositório

```bash
git clone https://github.com/DAN-3200/ts-macth-service.git
```

#### Configurando e iniciando o MongoDB com Docker

```.env
# .env (do diretório principal)
USERNAME_DB=admin
PASSWORD_DB=4321
```

```bash
docker-compose up -d mongo
```

#### Configurando e iniciando o Back End

```.env
# .env (back)
MONGO_URI=mongodb://admin:4321@localhost:27000
```

```bash
bun install
bun run dev
```

## Endpoints da API
A API pode ser testada via Postman:

**link** - [Collection Postman](https://www.postman.com/dan-3200/workspace/publico/documentation/43029232-50d55b29-08ea-4293-8cb9-1a055262809c)

## Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
