
async function clickAbility(ability_name) {
    const api_url = 'https://pokeapi.co/api/v2/ability/' + ability_name;
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);

    // set abilities details
    document.getElementById('endpoint').textContent = api_url;

    // look for EN name
    const abilityNames = data.names;
    abilityNames.forEach(nameItem => {
        if(nameItem.language.name == 'en') {
            document.getElementById('ability_name').textContent = nameItem.name;
        }
    });

    // look for EN effect/short effect
    const abilityEffects = data.effect_entries;
    abilityEffects.forEach(effectItem => {
        if(effectItem.language.name == 'en') {
            document.getElementById('ability_effect').textContent = effectItem.effect;
            document.getElementById('ability_short').textContent = effectItem.short_effect;
        }
    });
        
    // look for EN flavor text
    const abilityFlavours = data.flavor_text_entries;
    abilityFlavours.forEach(flavourItem => {
        if(flavourItem.language.name == 'en') {
            document.getElementById('ability_text').textContent = flavourItem.flavor_text;
        }
    });
}


async function clickPokemon(pokemon_name) {
    const api_url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon_name.toLowerCase();
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);

    document.getElementById('pokemon_abilities').textContent = "";

    // set pokemon details
    document.getElementById('endpoint').textContent = api_url;
    document.getElementById('pokemon_name').textContent = pokemon_name;
    document.getElementById('pokemon_height').textContent = data.height/10 + 'm';
    document.getElementById('pokemon_exp').textContent = data.base_experience;

    // set abilities text to nothing
    document.getElementById('ability_name').textContent = "";
    document.getElementById('ability_effect').textContent = "";
    document.getElementById('ability_short').textContent = "";
    document.getElementById('ability_text').textContent = "";

    // iterate through abilities to list them
    const abilities = data.abilities;
    abilities.forEach(abilityItem => {
        const abName = abilityItem.ability.name;
        const abilityLink = document.createElement('a');
        abilityLink.className = 'ability';
        var linkText = document.createTextNode(abName);
        abilityLink.appendChild(linkText);
        abilityLink.setAttribute("onclick", "clickAbility('" + abName + "')");

        document.getElementById('pokemon_abilities').appendChild(abilityLink);
        document.getElementById('pokemon_abilities').appendChild(document.createTextNode(" "));
    });
};