const myModal = new bootstrap.Modal("#chroma-modal");
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

/*var items = [];*/



document.querySelector('button[type=submit]').addEventListener('click', ()=>{
    var codigoComp = document.querySelector('input[name=codigo-comp]');
    var numeroPadrao = document.querySelector('input[name=numero-padrao]');
    var nomeCor = document.querySelector('input[name=nome-cor');
    var nomeType = document.querySelector('input[name="type-input"]:checked');

    data.home.unshift({
        codigo: codigoComp.value,
        padrao: numeroPadrao.value,
        cor: nomeCor.value,
        type: nomeType.value
    });

    saveData(data);
    getRostoIN();

    alert("Adicionado com sucesso.");


    /*

      <tr>                                           
           <td>6308382</td>
           <td>6.1772</td>
           <td>Azul Citadel</td>
     </tr>

    */
    
});

function getRostoIN(){
    const rostoLista = data.rostoLista;

    const rostoIn = rostoLista.filter((item) => item.type == 4);

    let listaRosto = document.querySelector('.chroma-rosto-list');
    listaRosto.innerHTML = "";

    if(rostoIn.length){
        let rostoInHtml = ``;
        let limit = 0;

        if(rostoInHtml.length > 5){
            limit = 5;

        }else{
            limit = rostoIn.length;
        }
    }

    for(let index = 0; index < limit ; index++){
        
            listaRosto.innerHTML+=`
    
            <table class="table-list-rosto">
                <thead>
                    <tr>
                        <th scope="col">Código do Componente</th>
                        <th scope="col">Padão</th>
                        <th scope="col">Cor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>                                           
                        <td>${val[index].codigo}</td>
                        <td>${val[index].padrao}</td>
                        <td>${val[index].cor}</td>
                    </tr>
                </tbody>
            </table>
            
            `;
    
        
        

        codigoComp.value = "";
        numeroPadrao.value = "";
        nomeCor.value = "";

        document.getElementById("chroma-rosto-list").innerHTML = listaRosto;
    }
   
}

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

  

}

//fução do botão sair.
function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}
