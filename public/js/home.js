const myModal = new bootstrap.Modal("#home-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");


let data = {
    home:[]
};

//Evento click do botão Sair.
document.getElementById("button-logout").addEventListener("click", logout);


document.getElementById("home-form").addEventListener("submit", function(e){
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

    
    getHome();

    alert("Adicionado com sucesso.");
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

    getHome();

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

function getHome(){
    const home = data.home;
    
    let homeHtml = ``;

    //Verificação para percorrer a lista e mostrar o tipe que é
    if(home.length) {
        home.forEach((item) => {
            let type = document.querySelector('input[name="type-input"]:checked');
            let artigo = document.querySelector('#artigo-select');

            if(item.type === "2"){
                type = "Londres"
            }else if(item.type === "3"){
                type = "Flat"
            }else if(item.type === "4"){
                type = "Rosto"
            }else if(item.type === "5"){
                type = "Banho"
            }else if(item.type === "6"){
                type = "Banhão"
            }
            
            if(item.artigo === "8") {
                artigo = "Chroma"
            }else if(item.artigo === "9") {
                artigo = "Scala"
            }else if(item.artigo === "10") {
                artigo = "Piso Londres";
            }else if(item.artigo === "11") {
                artigo = "Piso Flat"
            }else if(item.artigo === "12") {
                artigo = "Vienna"
            }else if(item.artigo === "13") {
                artigo = "Istambul"
            }else if(item.artigo === "14") {
                artigo = "Diamond"
            }else if(item.artigo === "15") {
                artigo = "Duna"
            }else if(item.artigo === "16") {
                artigo = "Native"
            }else if(item.artigo === "17") {
                artigo = "Santorne"
            }else if(item.artigo === "18") {
                artigo = "Galleria"
            }else if(item.artigo === "19") {
                artigo = "Line"
            }else if(item.artigo === "20") {
                artigo = "Sensi"
            }else if(item.artigo === "21") {
                artigo = "Mesclato"
            }
  
            //Tem a função de joga todos os dados adicinado na tela, html tirado la da tela home.html
            homeHtml += `
            <tr> 
                <td>${artigo}</td>
                <td>${type}</td>                                          
                <td>${item.value}</td>
                <td>${item.pattern}</td>
                <td>${item.color}</td>
          </tr>
            `;
        });
    }

    document.getElementById("home-list").innerHTML = homeHtml;
}