var button, search, url, modal, id, url2, div, botaoe, botaod, idp, reg = "2", select, nome;
url = "https://pokeapi.co/api/v2/pokemon/";
url2 = "https://pokeapi.co/api/v2/pokedex/";
function pesquisa() {
    fetch(url + search.value).then(res => res.json()).
        then(res => {
            modal.classList.remove("off");
            id = res.id;
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
        }).catch(() => {
            sairModal();
        });
    search.value = "";
}
function mudaPokemon(direcao) {
    if (direcao == "e") {
        id--;
        if (id < 1)
            id = 1;
    }
    else {
        id++;
    }
    search.value = id;
    pesquisa();
}
function sairModal() {
    modal.setAttribute("class", "off");
}
function pesquisar() {
    nome = "";
    div.innerHTML = "";
    fetch(url2 + reg + "/").then(res => res.json()).
        then(res => {
            res.pokemon_entries.map(item => {
                nome = item.pokemon_species.name;
                fetch(url + nome).then(result => result.json()).
                    then(result => {
                        idp = "" + item.entry_number + "";
                        div.innerHTML += `
                    <div class="elemento" id=${idp} onclick="mostraPokemon('${result.name}')">
                        <img src="${result.sprites.front_default}" alt="${result.name}">
                    </div>
                `;
                        if (item.entry_number == 1)
                            document.getElementById("1").style.display = "block";
                        idp = "1";
                    });
            });
        });
}
function mostraPokemon(nomep) {
    search.value = nomep;
    pesquisa();
}
function muda(dir) {
    document.getElementById(idp).style.display = "none";
    if (dir == 1) {
        idp++;
    }
    else {
        idp--;
        if (idp < 1) {
            idp = 1;
        }
    }
    try {
        document.getElementById(idp).style.display = "block";
    }
    catch{
        idp = idp - 2;
        muda(1);
    }
}
function regiao(regiao) {
    switch (regiao) {
        case "Kanto": regiao = '2'; break;
        case "Johto": regiao = '7'; break;
        case "Hoenn": regiao = '15'; break;
        case "Sinnoh": regiao = '6'; break;
        case "Unova": regiao = '9'; break;
        case "Kalos Central": regiao = '12'; break;
        case "Kalos Coastal": regiao = '13'; break;
        case "Kalos Mountain": regiao = '14'; break;
        case "Melemele": regiao = '17'; break;
        case "Akala": regiao = '18'; break;
        case "Ulaula": regiao = '19'; break;
        case "Poni": regiao = '20'; break;
        case "Alola": regiao = '21'; break;
    }
    reg = regiao;
    pesquisar();
}
function inicia() {
    select = document.querySelector("select[name=reg]");
    select.addEventListener("change", () => {
        regiao(select.value);
    });
    select.addEventListener("change", mostraPokemon);
    button = document.querySelector("header div button");
    button.addEventListener("click", () => {
        if (search.value != "")
            pesquisa();
    });
    search = document.querySelector("header div input");
    modal = document.getElementById("modal");
    document.addEventListener("keydown", event => {
        tecla = event.keyCode;
        if (tecla == 13 && search.value != "")
            pesquisa();
    })
    div = document.getElementById("cont");
    botaoe = document.querySelector("#elementos .esquerda");
    botaoe.addEventListener("click", () => {
        muda(-1);
    });
    botaod = document.querySelector("#elementos .direita");
    botaod.addEventListener("click", () => {
        muda(1);
    });
    pesquisar();
}
window.addEventListener("load", inicia);