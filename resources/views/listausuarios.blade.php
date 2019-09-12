@extends('templates.templatebasico')
 

@section('formlogin')
<form name="form-button" method="get" action="http://127.0.0.1:8000">
	<button class="btn btn-outline-info" type="submit">Sair</button>
</form>
@endsection

@section('body')
<h1>Lista de usuários</h1>

<table>
	<table class="table table-striped table-responsive" style="border: 1px solid lightgrey;">
		<thead>
			<tr>
				<th scope="col">ID</th>
				<th scope="col">Nome </th>							
			</tr>
		</thead>

		<tbody>																				

			<td>{{$id }}</td>
			<td>{{$nome}}</td>
		</tbody>				

	</table>	
</table>
@endsection

@section('footer')
@parent
@endsection