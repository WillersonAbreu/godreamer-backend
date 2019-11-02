<?php

namespace App\Http\Controllers;

use App\Amigo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AmizadeController extends Controller
{
    public function index($id)
    {
        $amigos = DB::select('select * from amigos where usuario_id = ?', [$id]);

        if(!empty($amigos)) return response()->json(["amigos" => $amigos]);
        return response()->json([null]);
    }

    public function create(Request $request)
    {
        $loggedUserId = $request->id_usuario;
        $newFriendUserId = $request->usuario_id;

        if (isset($loggedUserId) && isset($newFriendUserId)) {
            $amigo = new Amigo();

            $amigo->id_usuario = $loggedUserId;
            $amigo->usuario_id = $newFriendUserId;

            if ($amigo->save()) {
                return response()->json(["message" => "You have a new friend!", "status" => 200]);
            } else {
                return response()->json(["message" => "Error when adding new friend!", "status" => 400]);
            }
        }

    }

    public function update(Request $request, int $id)
    {

    }

    public function delete(Request $request)
    {
      $amizade = DB::select('select * from amigos where id_amizade = ?', [$request->id_amizade]);

      // dd($amizade);
      if(!empty($amizade)){
        $delete = DB::delete('delete from amigos where id_amizade = ?', [$request->id_amizade]);

        if($delete) return response()->json(["message" => "Amizade desfeita com sucesso!", "status" => 200]);
        else return response()->json(["error" => "Erro ao desfazer a amizade!", "status" => 400]);
      }
      return response()->json(["error" => "Amizade não existe no banco de dados!", "status" => 400]);

    }
}
