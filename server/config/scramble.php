<?php

use Dedoc\Scramble\Http\Middleware\RestrictedDocsAccess;
use Dedoc\Scramble\Extensions\Laravel\Sanctum\SanctumExtension;

return [

    /*
    |--------------------------------------------------------------------------
    | API Path
    |--------------------------------------------------------------------------
    |
    | Todas as rotas iniciadas com esse prefixo serão automaticamente
    | adicionadas à documentação.
    |
    */

    'api_path' => 'api',

    /*
    |--------------------------------------------------------------------------
    | API Domain
    |--------------------------------------------------------------------------
    */

    'api_domain' => null,

    /*
    |--------------------------------------------------------------------------
    | Export Path
    |--------------------------------------------------------------------------
    */

    'export_path' => 'api.json',

    /*
     * Informações da API
     */
    'info' => [
        'title' => 'TaskFlow API',
        'version' => '1.0.0',
        'description' => 'API profissional para o ecossistema TaskFlow. Gerencie tarefas, prazos e prioridades de forma segura e eficiente.',
        'contact' => [
            'name' => 'Suporte Técnico TaskFlow',
            'email' => 'suporte@taskflow.com',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Configuração da Interface
    |--------------------------------------------------------------------------
    */

    'ui' => [
        'title' => 'TaskFlow | API Docs',
        'theme' => 'dark',
        'hide_try_it' => false,
        'hide_schemas' => false,
        'logo' => '',
        'try_it_credentials_policy' => 'include',
        'layout' => 'responsive',
    ],

    /*
    |--------------------------------------------------------------------------
    | Servidores da API
    |--------------------------------------------------------------------------
    */

    'servers' => [
        'Local' => env('APP_URL') . '/api',
        'Production' => 'https://api.taskflow.com/api',
    ],

    /*
    |--------------------------------------------------------------------------
    | Estratégia de documentação dos Enums
    |--------------------------------------------------------------------------
    */

    'enum_cases_description_strategy' => 'description',

    'enum_cases_names_strategy' => 'names',

    /*
    |--------------------------------------------------------------------------
    | Query Parameters
    |--------------------------------------------------------------------------
    */

    'flatten_deep_query_parameters' => true,

    /*
    |--------------------------------------------------------------------------
    | Middleware da documentação
    |--------------------------------------------------------------------------
    */

    'middleware' => [
        'web',
        RestrictedDocsAccess::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Extensions
    |--------------------------------------------------------------------------
    |
    | Habilita integração automática com Laravel Sanctum
    | para autenticação Bearer Token.
    |
    */

    'extensions' => [
        SanctumExtension::class,
    ],
];