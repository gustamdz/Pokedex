const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImg = document.querySelector('.pokemon__image');
const container = document.querySelector('.container');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let searchPokemon = 1;

// Abertura de conexão com a API
const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

// Regastar os dados na API e renderizar
const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = 'Loading...';
    pokemonName.innerHTML = '';
    pokemonImg.style.display = 'block';

    const criaSpan = (tipo) => {
        const template = `
        <div class="type ${tipo[0]}">
        <span class="pokemon__type">${tipo.join(' | ')}</span>
        </div>`;
        
        container.innerHTML = template;
        
        return template;
    }
    
    if(!data){
        pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`;
        pokemonName.innerHTML = '???';
        pokemonNumber.innerHTML = "???";
    }
    
    let type = data.types.map((typeInfo) => typeInfo.type.name)
    criaSpan(type);
    pokemonNumber.innerHTML = data.id;
    pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
    pokemonName.innerHTML = data.name;
    searchPokemon = data.id;
    input.value =  '';

}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

prev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);
