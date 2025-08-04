# ATPV-e

Projeto para coleta de dados de ATPV-e e cadastro em um banco de dados

## Dados coletados

### Carro
- Placa
- Renavam
- Chassi
- CRV
- Data de Emissão do CRV
- Numero da Via do CRV
- Código de Segurança do CRV
- Ano de Fabricação
- Ano do Modelo
- Quilometragem

### Venda
- Valor
- Data
- Cidade
- Estado

### Vendedor e Comprador
- Tipo de Pessoa (Fisica ou Jurídica)
- CPF ou CNPJ
- Nome
- Email
- CEP
- Endereço
- Numero

## Como usar

```bash
git clone https://github.com/spectronp/atpv.git 
cd atpv
npm install

# Configure um banco de dados
cp .env.example .env

# .env
DATABASE_URL="<SEU_DATABASE_URL>"

# Rodar servidor de desenvolvimento
npm run dev
```
Agora é so abrir seu navegador em `http://localhost:3000`

## TODOs

- [X] Adicionar .env.example
- [X] Criar README.md
- [X] Trocar Zod pelo Yup
- [ ] Fazer Deploy