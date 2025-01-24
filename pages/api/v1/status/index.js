function status(request, response) {
  response.status(200).json({ chave: "Alunos do Curso.de são acima da média" });
}

export default status;
