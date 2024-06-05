// search for players by name:
// https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=Danny_Welbeck
// player details by ID
// www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=34145937

let count = 0;

const loadData = () => {
    fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p')
        .then((res) => res.json())
        .then((data) => {
            displayPlayer(data.player);
        });

} ;

const displayPlayer = (players) => {
    players.forEach(newplayer => {
    const containerBox = document.getElementById("container-box");
    const div = document.createElement("div");
        div.classList.add("card");
    div.innerHTML = `
        <img class="card-img" src="${newplayer.strCutout}"/>
        <h6>${newplayer.strPlayer}</h6>
        <h6>Nationality:${newplayer.strNationality}</h6>
        <h6>name:${newplayer.strDescriptionEN.slice(0, 10)}</h6>
        <button onclick = "AddToCart('${newplayer.strPlayer}')" class="btn btn-primary m-auto">Add to cart</button>
        <button onclick = "showDetails('${newplayer.idPlayer}')" class="btn btn-dark m-auto mt-2">Details</button>
        <div class="d-flex text-center">
        <a href='${newplayer.strFacebook}' class="fa fa-facebook"></a>
        <a href='${newplayer.strTwitter}' class="fa fa-twitter"></a>
        </div>
        
    `;

    containerBox.appendChild(div);
    });
    

};

const searchPlayer = () => {
    const inputValue = document.getElementById("search-box").value;
    
    loadSearchData(inputValue);
    document.getElementById("search-box").value = "";
};

const loadSearchData = (name) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            displaySearch(data.player);
        });

}; 

const displaySearch = (newplayers) => {
     console.log(newplayers);
    
    const containerBox = document.getElementById("container-box");
    document.getElementById("container-box").innerHTML = "";
    newplayers.forEach(newplayer => {
        console.log(newplayer);
    
    const div = document.createElement("div");
        div.classList.add("card");
    div.innerHTML = `
        <img class="card-img" src="${newplayer.strCutout
        }"/>
        <h6>${newplayer.strPlayer}</h6>
        <h6>Nationality:${newplayer.strNationality}</h6>
        <h6>name:${newplayer.strDescriptionEN.slice(0, 10)}</h6>
        <button onclick = "AddToCart('${newplayer.strPlayer}')" class="btn btn-primary m-auto">Add to cart</button>
        <button onclick = "showDetails('${newplayer.idPlayer}')" class="btn btn-dark m-auto mt-2">Details</button>
        <div class="d-flex text-center">
        <a href='${newplayer.strFacebook}' class="fa fa-facebook"></a>
        <a href='${newplayer.strTwitter}' class="fa fa-twitter"></a>
        </div>
    `;

    containerBox.appendChild(div);
    });
      
};

const AddToCart = (player_name) => {
    count = count +1;
    if(count > 11){
        alert("Do not add any player, you reached at 11");
    }
    else{
        const countBox = document.getElementById("count");
        countBox.innerText = count;
        const cartBox = document.getElementById("cart-box");
        const div = document.createElement("div");
        div.innerHTML = `
        <p>${player_name}</p>
        `;
        cartBox.appendChild(div); 
    }
    
};

const showDetails = (id) => {
    
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            
            displayDetailsById(data.players);
        });
}; 

const displayDetailsById = (aplayer) => {
    console.log(aplayer);
    aplayer.forEach(player => {
        const modalHeader = document.getElementById("modal-header");
        modalHeader.innerHTML=`
        <h3>${player.strPlayer}</h3>
        `; 
        const modalBody = document.getElementById("modal-body");
        
        modalBody.innerHTML = `
        <h6>nationality : '${player.strNationality}'</h6>
        <h6>sport : '${player.strSport}'</h6>
        <h6>Gender : '${player.strGender}'</h6>
        <h6>Birth Location : '${player.strBirthLocation}'</h6>
        <h6>Etbnicity : '${player.strEthnicity}'</h6>
        <h6>Position : '${player.strPosition}'</h6>
        <h6>height : '${player.strHeight}'</h6>
        <h6>weight : '${player.strWeight}'</h6>
        <h6>team : '${player.strTeam}'</h6>
        <h6>social media : '${player.strTwitter}'</h6>
        <p><b>Detail Description :</b> '${player.strDescriptionEN}'</p>
        `;   
    });
    const modal1 = new bootstrap.Modal(document.getElementById('gfg'));
    modal1.show();
};


loadData();
