<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Chat;

class ConversacaoController extends Controller
{
    public function criar(Request $request)
    {
        $participantes = [$request->$id1, $request->$id2];

        $conversation = Chat::createConversation($participantes);

        return redirect("/feed/{$id1}/{$conversation->id}")
            ->with('flash', 'You have started a new Conversation!');
    }
}
