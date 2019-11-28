<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class InitialSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('usuarios')->insert([
      'nome' => 'Willerson',
      'email' => 'w@w.com',
      'senha' => Hash::make('123456'),
      'celular' => '(12)98175-5795',
      'data_nasc' => '1992-07-29',
      'tipo_usuario' => 1
    ]);

    DB::table('usuarios')->insert([
      'nome' => 'Rayssa',
      'email' => 'r@r.com',
      'senha' => Hash::make('123456'),
      'celular' => '(12)98158-5705',
      'data_nasc' => '1997-02-18',
      'tipo_usuario' => 2
    ]);

    DB::table('posts')->insert([
      [
        'usuario_id' => 1,
        'url_img' => 'fotodowill.jpg',
        'post' => 'asadasdasdadsadas'
      ],
      [
        'usuario_id' => 2,
        'url_img' => 'fotodarayssa.jpg',
        'post' => 'asadasdasdadsadas'
      ]
    ]);

    DB::table('amigos')->insert([
      'id_usuario' => 1,
      'usuario_id' => 2
    ]);
  }
}
