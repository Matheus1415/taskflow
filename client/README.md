← [Voltar ao Menu Principal](https://github.com/Matheus1415/taskflow/)

## Task Flow

Este é o repositório do front-end do **TaskFlow**, uma aplicação moderna de gerenciamento de tarefas focada em produtividade, experiência do usuário (UX) e alta performance.

Construído com **React**, **Vite** e **Tailwind CSS**, o projeto oferece uma interface fluida com suporte a temas, fluxos de trabalho inteligentes (como Soft Deletes) e guias interativos.

## 🖼️ Imagens do Site
<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
  <img height="848" alt="image" src="https://github.com/user-attachments/assets/aa5fc923-ffeb-40de-9919-48ff7fc1cada" width="48%" />
  <img height="848" alt="image" src="https://github.com/user-attachments/assets/3dd03dbb-be40-4b52-81ec-1020ae2c7fed" width="48%" />
  <img height="848" alt="image" src="https://github.com/user-attachments/assets/278b5905-747e-4ccd-865a-72baf56cb7f0" width="48%" />
  <img height="848" alt="image" src="https://github.com/user-attachments/assets/d703b245-a602-4b60-b375-d6b4784a6a45" width="48%" />
</div>

---

## Funcionalidades

-   **Gestão Completa de Tarefas:** Criação, edição, conclusão e exclusão de tarefas.
-   **Sistema de Lixeira (Soft Delete):** Exclua tarefas temporariamente e restaure-as quando necessário ou exclua-as permanentemente.
-   **Filtros Avançados:** Filtre tarefas por prioridade, status e ordene por data de criação ou prazo.
-   **Guia Interativo:** Tour guiado para facilitar o onboarding de novos usuários.
-   **Totalmente Responsivo:** Design adaptável para dispositivos móveis, tablets e desktops.
-   **Sincronização em Tempo Real:** Gerenciamento de estado e cache de API eficiente com `SWR`.

---

## Como Começar

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   NPM ou [PNPM](https://pnpm.io/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Matheus1415/taskflow.git
    ```

2.  **Acesse a pasta do front-end:**
    ```bash
    cd taskflow/frontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    pnpm install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto e adicione a URL da sua API Laravel:
    ```env
    VITE_API_URL=http://localhost:8000/api
    ```

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    pnpm dev
    ```

A aplicação estará disponível em `http://localhost:5173`.

---

## 📂 Estrutura de Pastas

```text
src/
├── @types/          # Tipagens globais do TypeScript
├── components/      # Componentes de UI reutilizáveis (Shadcn, botões, etc.)
├── hooks/           # Custom hooks (useTaskCrud, useAuth, etc.)
├── http/            # Configurações de respostas e tipos da API
├── lib/             # Configurações de bibliotecas (Axios, SWR)
├── pages/           # Páginas da aplicação (Login, Dashboard)
├── services/        # Lógica de integração com serviços externos
└── utils/           # Funções utilitárias e formatadores
