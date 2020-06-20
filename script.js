var button, search, url, modal;
url = "https://pokeapi.co/api/v2/pokemon/";

function pesquisa() {
    fetch(url + search.value).then(res => res.json()).
    then(res => {
        modal.classList.remove("off");
        var tipos = res.types.map(item => `<span class= "${item.type.name}"> <h4>` + item.type.name + "</h4> </span>").toString();
        var psq = tipos.match(",");
        if (psq != null)
            tipos = tipos.replace(/,/g, "");
        var habilidades = res.abilities.map(item => `<span class= "ability"> <h4>` + item.ability.name + "</h4> </span>").toString();
        var psq = habilidades.match(",");
        if (psq != null)
            habilidades = habilidades.replace(/,/g, "");
        modal.innerHTML = `
            <div id="pokemon">
                <div id="img">
                    <img src="${res.sprites.front_default}" alt="">
                </div>
                <div id="cont">
                    <h1>${res.name}</h1>
                    <h2>N° ${res.id}</h2>
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
            </div>
        `;
    });
    search.value = "";
}

function sairModal() {
    modal.setAttribute("class", "off");
}

function inicia() {
    button = document.querySelector("header div button");
    button.addEventListener("click", pesquisa);
    search = document.querySelector("header div input");
    modal = document.getElementById("modal");
    modal.addEventListener("click", sairModal);
    document.addEventListener("keydown", event => {
        tecla = event.keyCode;
        if (tecla == 13 && search.value != "")
            pesquisa();
    })
}
window.addEventListener("load", inicia);