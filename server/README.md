← [Voltar ao Menu Principal](https://github.com/Matheus1415/taskflow/)

# TaskFlow API

O **TaskFlow API** é um backend desenvolvido com foco em arquitetura escalável, boas práticas e separação clara de responsabilidades. A aplicação implementa um sistema completo de gerenciamento de tarefas com autenticação, soft delete, filtros avançados e documentação automática de API.

---

## ⚙️ Configuração do Projeto

### Pré-requisitos

- PHP 8.2+
- Composer
- MySQL ou PostgreSQL
- Servidor local (Laragon, XAMPP ou similar)

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Matheus1415/taskflow-api.git
cd server
```

### 2. Instale as dependências

```bash
composer install
```

### 3. Configure o ambiente
Copie o arquivo `.env`:

```bash
cp .env.example .env
```
Configure as variáveis principais:

```bash
APP_NAME=TaskFlow
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=taskflow
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Gere a chave da aplicação

```bash
php artisan key:generate
```

### 5. Execute as migrations

```bash
php artisan migrate
```


### 6. (Opcional) Seed do banco

```bash
php artisan db:seed
```


### 7. Inicie o servidor

```bash
php artisan serve
```

---

## 📚 Documentação da API

A documentação da API é gerada automaticamente utilizando o Scramble, garantindo que ela esteja sempre atualizada com o código da aplicação.
Acesse em:
```
http://127.0.0.1:8000/docs/api
```

---

## 🧠 Estrutura de Pastas e Arquitetura

O projeto utiliza uma arquitetura em camadas (Controller, Service e Request) para separar responsabilidades e manter o backend organizado, escalável e de fácil manutenção. Essa abordagem reduz o acoplamento entre regras de negócio e requisições HTTP, facilitando testes, evolução do sistema e garantindo um código mais limpo e próximo de aplicações reais em produção.

```
app/
├── Http/
│   ├── Controllers/        # Controllers da API
│   ├── Requests/           # Validação de entrada (Form Requests)
│   ├── Resources/          # Transformação de resposta da API
│
├── Services/               # Regras de negócio (Service Layer)
├── Enums/                  # Enums de domínio (status, prioridade)
├── Models/                 # Models Eloquent
├── Docs/                   # Documentação da API (Scramble)
```
