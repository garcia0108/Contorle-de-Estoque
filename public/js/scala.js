const myModal = new bootstrap.Modal("#scala-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");


let data = {
    home:[]
};

//Evento click do botão Sair e do botão Ver mais.
document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("home-button").addEventListener("click", function() {
    window.location.href = "home.html"
});


document.getElementById("scala-form").addEventListener("submit", function(e){
    e.preventDefault();//Evento para um reloud na pagina.

     //Variaveis dos valores dos Inputs.
     const value = document.getElementById("value-input");
     const pattern = document.getElementById("pattern-input");
     const color = document.getElementById("color-input");
     const nomeCheck = document.querySelector('input[name="type-input"]:checked');
     const nomePesquisa = document.getElementById("artigo-select");

     //Unshift = ele adiciona itens em cima e o push adiciona no final
    data.home.unshift({
        value: value.value,
        pattern: pattern.value,
        color: color.value, 
        check: nomeCheck.value,
        pesquisa: nomePesquisa.value
        
       
    });

    saveData(data);
    e.target.reset(); //Para limpar o formulário 
    myModal.hide();//Para fechar o Modal

    getRosto();
    getBanho();


    alert("Adicionado com sucesso!");
})

checkLogged();
//Função para se manter logado.
function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);//Para permanecer logado.
        logged = session;
    }
    //se não tiver logado envia o usuário para a tela de login(login-html)
    if(!logged) {
       window.location.href = "index.html";
       return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser){
        data = JSON.parse(dataUser);
    }

    //getRosto();
    //getBanho();

}

//fução do botão sair.
function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}


function getRosto(){
    const scalaRosto = data.scalaRosto;
    const artigoScala = data.artigoScala;

    const rosto = scalaRosto.filter((item) => item.check == "4");//Só vai entrar os itens do tipo 4(Rosto)
    const artigo = artigoScala.filter((item) => item.pesquisa === "9");//Só vai entrar os itens do tipo 9(Scala)

    if(artigo === "9"){
        artigo = "Scala"
    }else{
        alert("Artigo errado!")
    }


    if(rosto.length){
        let rostoHtml = ``;
        let limit = 0;

        //Para percorer os dados e mostra apesas 5 na tabela caso contrário mostrar apenas o que tiver.
        if(rosto.length > 5) {
            limit = 5;
        } else {
            limit = rosto.length;
        }
        //Esse HTML a gente vai colocar todas as vezes que achar um item no rosto
        for (let index = 0; index < limit ; index++){
            rostoHtml +=  `
                <table class="table">
                    <thead>
                       <tr>
                            <th scope="col">Código do Componente</th>
                            <th scope="col">Padão</th>
                            <th scope="col">Cor</th>
                        </tr>
                    </thead>
                     <tbody>
                        <tr>                                           
                            td>${rosto[index].value}</td>
                            <td>${rosto[index].pattern}</td>
                            <td>${rosto[index].color}</td>
                        </tr>
                    </tbody>
                </table>    
                `;
            }

        
    }

    document.getElementById("scala-rosto-list").innerHTML = rostoHtml;

}

function getBanho(){
    const scalaBanho = data.scalaBanho;

    const banho = scalaBanho.filter((item) => item.check == "5");//Só vai entrar os itens do tipo 5(Banho)
    const artigo = artigoScala.filter((item) => item.pesquisa === "9");

    if(artigo === "9"){
        artigo = "Scala"
    }else{
        alert("Artigo errado!");
    }

    if(banho.length){
        let banhoHtml = ``;
        let limit = 0;

        //Para percorer os dados e mostra apesas 5 na tabela caso contrário mostrar apenas o que tiver.
        if(banho.length > 5) {
            limit = 5;
        } else {
            limit = banho.length;
        }
        //Esse HTML a gente vai colocar todas as vezes que achar um item no rosto
        for (let index = 0; index < limit ; index++){
            banhoHtml +=  `
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Código do Componente</th>
                    <th scope="col">Padão</th>
                    <th scope="col">Cor</th>
                </tr>
                </thead>
                <tbody>
                <tr>                                           
                    <td>${banho[index].value}</td>
                    <td>${banho[index].pattern}</td>
                    <td>${banho[index].color}</td>
                </tr>
                </tbody>
        </table> 
                `;
            }

        
    }

    document.getElementById("scala-banho-list").innerHTML = banhoHtml;

}

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}
