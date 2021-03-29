function CarregarTabela(){
    var conteudotabela=document.getElementById("Tabelaprincipal");
    var totallinhas=conteudotabela.rows.length;
    var linha=conteudotabela.insertRow(totallinhas);
    var coluna1=linha.insertCell(0);
    var coluna2=linha.insertCell(1);
    var coluna3=linha.insertCell(2);
    var coluna4=linha.insertCell(3);

    coluna1.innerHTML="mouse";
    coluna2.innerHTML="1";
    coluna3.innerHTML="79,90";
    coluna4.innerHTML="79,90";
    window.open("Pagina2trab1.html");
}