document.addEventListener("DOMContentLoaded", async() => {
    await load_data();
});
// fonction pour aficher les champion avec ces différents attributs
async function load_data() {
    const contentElement = document.getElementById("cards");
    // ENVOIE DE LA REQUETE EN GET
    const request = await fetch("Serveur/list.php");
    const champions = await request.json();
    contentElement.innerHTML = "";
    for (const champion of champions) {
        contentElement.innerHTML += `
        <li class="cards_item id="${champion.id}>
            <div class="card">
                <div class="card_image"><img id="img1" src="${champion.img}".png></div>
                <div class="card_content">
                    <h2 class="card_title">Nom : ${champion.name}</h2>
                    <p class="card_text">Vie : ${champion.vie}</p>
                    <p class="card_text">Phase : ${champion.phase}</p>
                    <p class="card_text">Arme : ${champion.arme}</p>
                    <a class="btn button" href="#popup${champion.id}" id="${champion.id}">éditer</a>  
                    <div id="popup${champion.id}" class="overlay">
                        <div class="popup">
                            <h2>édition de ${champion.name}</h2>
                            <a class="close" href="#">&times;</a>
                            <div class="content1">
                                <label class="custom-select2" for="champion_input_popup">
                                    <select id="champion_input_popup" >
                                        <option value="">
                                        Champion
                                        </option>
                                        <option value="Maverick">Maverick</option>
                                        <option value="Clash">Clash</option>
                                        <option value="Alibi">Alibi</option>
                                        <option value="Maestro">Maestro</option>
                                    </select>
                                </label>
                                <div class="form__group2 field">
                                    <input type="input" class="form__field2" placeholder="Nom" name="Nom" id='name_input_popup' required />
                                    <label for="name" class="form__label2">Nom</label>
                                </div>
                                <div class="form__group2 field">
                                    <input  type="number" class="form__field2" placeholder="Vie" name="Vie" id='vie_input_popup' required />
                                    <label for="Vie" class="form__label2">Vie</label>
                                </div>
                                <label class="custom-select2" for="phase_input_popup">
                                    <select id="phase_input_popup" >
                                        <option value="">
                                        Quelle Phase ?
                                        </option>
                                        <option value="Attaque">Attaque</option>
                                        <option value="Defense">Defense</option>
                                    </select>
                                </label>
                                <label class="custom-select2" for="arme_input_popup">
                                    <select id="arme_input_popup" >
                                        <option value="">
                                        Arme
                                        </option>
                                        <option value="m4">m4</option>
                                        <option value="mp5">mp5</option>
                                        <option value="mpx">mpx</option>
                                    </select>
                                </label>
                                <button class="btn3" onclick="edit('${champion.id}')">Modifier</button>
                            </div>
                        </div>
                    </div>
                    <button class="btn" onclick="supp_champion('${champion.id}')" id="${champion.id}">Supprimer</button>
                </div>
            </div>
        </li>`;
    }
}

// fonction pour éditer un champion et ces différents attributs
async function supp_champion(id) {
    const champion = { "id": id };
    // envoi de la requete DELETE
    await fetch("Serveur/delete.php", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(champion)
    });
    await load_data();
}

// fonction pour éditer un champion avec ces différents attributs
async function edit(id) {
    const selecteur = document.getElementById("champion_input_popup").value;
    const nom = document.getElementById("name_input_popup").value;
    const vie = document.getElementById("vie_input_popup").value;
    const phase = document.getElementById("phase_input_popup").value;
    const arme = document.getElementById("arme_input_popup").value;
    let champion = {
        "id": id

    };
    if (selecteur !== "") {
        champion["img"] = `image/${selecteur}.png`
    }
    if (nom !== "") {
        champion["name"] = nom
    }
    if (vie !== "") {
        champion["vie"] = vie
    }
    if (phase !== "") {
        champion["phase"] = phase
    }
    if (arme !== "") {
        champion["arme"] = arme
    }
    // envoi de la requete PUT
    await fetch("Serveur/edit.php", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(champion)
    });
    await load_data();
}


// fonction pour créer un champion avec ces différents attributs
async function send_champion() {
    // Création du champion
    const contentElement = document.getElementById("erreur");
    const selecteur = document.getElementById("Champion_input").value;
    const nom = document.getElementById("name_input").value;
    const vie = parseInt(document.getElementById("vie_input").value);
    const phase = document.getElementById("phase_input").value;
    const arme = document.getElementById("arme_input").value;
    if (!selecteur || !nom || !vie || !phase || !arme) {
        contentElement.innerHTML = `<div class="erreur2"><div class="erreur1">Remplir les champs sinon une balle!!!</div></div>`
    } else {
        const champion = {
            "name": nom,
            "vie": vie,
            "img": `image/${selecteur}.png`,
            "phase": phase,
            "arme": arme
        };
        // envoi de la requete POST
        await fetch("Serveur/add.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(champion)
        });

    }
    await load_data();
}