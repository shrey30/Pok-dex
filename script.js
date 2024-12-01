document
  .getElementById("pokemonForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const numCards = parseInt(document.getElementById("numCards").value);
    const category = document.getElementById("category").value;
    const cardContainer = document.getElementById("pokemonCards");
    cardContainer.innerHTML = "";

    try {
      let count = 0;
      for (let id = 1; count < numCards; id++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        const types = data.types.map((typeInfo) => typeInfo.type.name);
        if (types.includes(category)) {
          count++;
          const card = document.createElement("div");
          card.className = "pokemon-card";
          card.innerHTML = `
                    <h2>${data.name}</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <p>Type: ${types.join(", ")}</p>
                `;
          cardContainer.appendChild(card);
        }
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      cardContainer.innerHTML = `<p>Failed to fetch Pokémon data. Please try again later.</p>`;
    }
  });
