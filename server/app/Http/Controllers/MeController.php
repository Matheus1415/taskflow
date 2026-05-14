<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class MeController extends Controller
{

    public function me()
    {
        $user = Auth::user();

        return $this->success('Dados do usuário recuperados!', [
            'user' => $user
        ]);
    }
}
