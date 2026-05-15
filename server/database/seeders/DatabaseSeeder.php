<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Matheus Dev',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        // Definir os dados das tarefas
        $tasks = [
            // --- PRIORIDADE ALTA ---
            [
                'title' => 'Configurar Sanctum no Backend',
                'description' => 'Implementar autenticação SPA e proteger rotas de tarefas no api.php.',
                'priority' => 'high',
                'status' => 'done',
                'due_date' => now()
            ],
            [
                'title' => 'Implementar Hook useAuth',
                'description' => 'Criar contexto global no React para gerenciar login, logout e persistência do usuário.',
                'priority' => 'high',
                'status' => 'pending',
                'due_date' => now()->addDays(1)
            ],
            [
                'title' => 'Correção de bug no Soft Delete',
                'description' => 'Ajustar query scope para garantir que tarefas deletadas não apareçam na listagem principal.',
                'priority' => 'high',
                'status' => 'pending',
                'due_date' => now()->addHours(5)
            ],
            [
                'title' => 'Validar formulário com Zod',
                'description' => 'Adicionar validação de schema no frontend para evitar submits vazios ou inválidos.',
                'priority' => 'high',
                'status' => 'pending',
                'due_date' => now()->addDays(2)
            ],

            // --- PRIORIDADE MÉDIA ---
            [
                'title' => 'Estudar Server-Side Rendering (SSR)',
                'description' => 'Pesquisar como o Inertia.js facilita a integração Laravel + React comparado ao modo SPA puro.',
                'priority' => 'medium',
                'status' => 'pending',
                'due_date' => now()->addWeek()
            ],
            [
                'title' => 'Customizar Temas do Shadcn/UI',
                'description' => 'Alterar as variáveis de cor no globals.css para seguir a paleta do TaskFlow.',
                'priority' => 'medium',
                'status' => 'done',
                'due_date' => now()->subDays(2)
            ],
            [
                'title' => 'Otimizar Queries com Eager Loading',
                'description' => 'Usar User::with("tasks") para evitar o problema de N+1 no endpoint de usuários.',
                'priority' => 'medium',
                'status' => 'pending',
                'due_date' => now()->addDays(4)
            ],
            [
                'title' => 'Configurar Axios Interceptors',
                'description' => 'Capturar erros 401 automaticamente e redirecionar usuário para a tela de login.',
                'priority' => 'medium',
                'status' => 'pending',
                'due_date' => now()->addDays(3)
            ],
            [
                'title' => 'Refatorar TaskService',
                'description' => 'Mover lógica de negócio do Controller para uma Service Layer mais limpa.',
                'priority' => 'medium',
                'status' => 'pending',
                'due_date' => now()->addDays(5)
            ],

            // --- PRIORIDADE BAIXA ---
            [
                'title' => 'Adicionar Animações com Framer Motion',
                'description' => 'Criar transições suaves ao deletar ou concluir itens da lista.',
                'priority' => 'low',
                'status' => 'pending',
                'due_date' => now()->addMonth()
            ],
            [
                'title' => 'Gerar Documentação Swagger',
                'description' => 'Utilizar o Scramble para expor a documentação interativa da API.',
                'priority' => 'low',
                'status' => 'done',
                'due_date' => now()->subWeek()
            ],
            [
                'title' => 'Revisar Tipagem TypeScript',
                'description' => 'Garantir que as interfaces de Task batem exatamente com o retorno do JSON do Laravel.',
                'priority' => 'low',
                'status' => 'pending',
                'due_date' => now()->addDays(10)
            ],
            [
                'title' => 'Backup do Banco de Dados',
                'description' => 'Configurar um script simples para exportar o dump do banco semanalmente.',
                'priority' => 'low',
                'status' => 'pending',
                'due_date' => now()->addDays(15)
            ],
            [
                'title' => 'Implementar Dark Mode Toggle',
                'description' => 'Adicionar alternador de tema usando next-themes ou estado local do React.',
                'priority' => 'low',
                'status' => 'done',
                'due_date' => now()->subDays(10)
            ],
            [
                'title' => 'Deploy na Vercel/Railway',
                'description' => 'Configurar as variáveis de ambiente e testar o fluxo de produção.',
                'priority' => 'low',
                'status' => 'pending',
                'due_date' => now()->addWeek(2)
            ],
        ];

        foreach ($tasks as $taskData) {
            $user->tasks()->create($taskData);
        }

        // Criar tarefas na LIXEIRA 
        $user->tasks()->create([
            'title' => 'Tarefa Antiga Descartada',
            'description' => 'Esta tarefa foi removida e deve aparecer na lixeira.',
            'priority' => 'low',
            'status' => 'pending',
            'deleted_at' => now(),
        ]);

        $this->command->info('Database seeded: Usuário "test@example.com" criado com 7 tarefas temáticas!');
    }
}