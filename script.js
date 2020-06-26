var button, search, url, modal,id;
url = "https://pokeapi.co/api/v2/pokemon/";
function pesquisa() {
    fetch(url + search.value).then(res => res.json()).
    then(res => {
        modal.classList.remove("off");
        id=res.id;
        var tipos = res.types.map(item => `<span class= "${item.type.name}"> <h4>` + item.type.name + "</h4> </span>").toString();
        var psq = tipos.match(",");
        if (psq != null)
            tipos = tipos.replace(/,/g, "");
        var habilidades = res.abilities.map(item => `<span class= "ability"> <h4>` + item.ability.name + "</h4> </span>").toString();
        var psq = habilidades.match(",");
        if (psq != null)
            habilidades = habilidades.replace(/,/g, "");
        modal.innerHTML = `
            <div class="seta esquerda" onclick="mudaPokemon('e')"><</div>
            <div id="pokemon">
                <div id="img">
                    <img src="${res.sprites.front_default}" alt="">
                </div>
                <div id="cont">
                    <h1>${res.name}</h1>
                    <h2>N° ${id}</h2>
                    <h3>Peso: (${res.weight / 10}kg)</h3>
                    <h3>Altura: (${res.height / 10}m)</h3>
                    <h4>Tipo</h4>
                    <div id="tipo">
                        ${tipos}
                    </div>
                    <h4>Habilidades</h4>
                    <div id="ability">
                        ${habilidades}
                    </div>
                </div>
                <div id="sair"><a href="#" onclick="sairModal()">Sair</a></div>
            </div>
            <div class="seta direita" onclick="mudaPokemon('d')">></div>
        `;
    }).catch(()=>{
        alert("Este pokemon não existe");
        sairModal();
    });
    search.value = "";
}
function mudaPokemon (direcao){
    if(direcao=="e"){
        id--;
        if(id<1)
            id=1;
    }
    else{
        id++;
    }
    search.value=id;
    pesquisa();
}
function sairModal() {
    modal.setAttribute("class", "off");
}
function inicia() {
    button = document.querySelector("header div button");
    button.addEventListener("click", ()=>{
        if(search.value!="")
            pesquisa();
    });
    search = document.querySelector("header div input");
    modal = document.getElementById("modal");
    document.addEventListener("keydown", event => {
        tecla = event.keyCode;
        if (tecla == 13 && search.value != "")
            pesquisa();
    })
}
window.addEventListener("load", inicia);