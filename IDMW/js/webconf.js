window.onload = function () {
    //código para manipular DOM
    const urlBase = "https://fcawebbook.herokuapp.com"

    const btnRegister = document.getElementById("btnRegister")
    btnRegister.addEventListener("click", function () {
        /*  swal=SWeet ALert */
        swal({
            title: "Inscrição na WebConference",
            html:
            '<input id="swal-input1" class="swal2-input" placeholder="nome">' +
            '<input id="swal-input2" class="swal2-input" placeholder="e-mail">',      
            showCancelButton: true,
            confirmButtonText: "Inscrever",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
              const name = document.getElementById('swal-input1').value
              const email = document.getElementById('swal-input2').value

              try {
                    const response = await fetch(`${urlBase}/conferences/1/participants/${email}`, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        body: `nomeparticipant=${name}`
                    });
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return await response.json();
                } catch (error) {
                    swal.showValidationError(`Request failed: ${error}`);
                }
            },
            allowOutsideClick: () => !swal.isLoading()
          }).then(result => {
            if (result.value) {               
              if (!result.value.err_code) {
                swal({title: "Inscrição feita com sucesso!"})  
              } else {
                swal({title: `${result.value.err_message}`})  
              }
            }
          });
      
    });

    //button login to private area
    const btnLogin = document.getElementById("btnLogin")
    btnLogin.addEventListener("click", function () {
        /*  swal=SWeet ALert */
        swal({
            title: "Login na área reservada",
            html:
            '<input id="swal-input1" class="swal2-input" placeholder="e-mail">' +
            '<input type="password" id="swal-input2" class="swal2-input" placeholder="password">',      
            showCancelButton: true,
            confirmButtonText: "Entrar",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
              const email = document.getElementById('swal-input1').value
              const password = document.getElementById('swal-input2').value
              try {
                    const response = await fetch(`${urlBase}/signin`, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        body: `email=${email}&password=${password}`
                    });
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return await response.json();
                } catch (error) {
                    swal.showValidationError(`Request failed: ${error}`);
                }
            },
            allowOutsideClick: () => !swal.isLoading()
          }).then(result => {
            if (result.value) {               
              if (!result.value.err_code) {
                swal({title: "Entrou com sucesso!"})  
              } else {
                swal({title: `${result.value.err_message}`})  
              }
            }
          });
    });

};

/* RENDER SPEAKERS */
(async() => {
    const renderSpeakers = document.getElementById("renderSpeakers")
    let txtSpeakers = ""
    const response = await fetch(`${urlBase}/conferences/1/speakers`)
    const speakers = await response.json()

    for (const speaker of speakers) {
        txtSpeakers += `
        <div class="col-sm-4">
                    <div class="team-member">
                        <img id="${speaker.idSpeaker}" class="mx-auto rounded-circle viewSpeaker" src="${speaker.foto}" alt="">
                        <h4>${speaker.nome}</h4>
                        <p class="text-muted">${speaker.cargo}</p>
                        <ul class="list-inline social-buttons">`
        if (speaker.twitter!==null) {
            txtSpeakers += `
            <li class="list-inline-item">
                <a href="${speaker.twitter}" target="_blank">
                    <i class=fab fa-twitter"></i>
                </a>
            </li>`
        }
        if (speaker.facebook!==null) {
            txtSpeakers += `
            <li class="list-inline-item">
                <a href="${speaker.facebook}" target="_blank">
                    <i class=fab fa-facebook"></i>
                </a>
            </li>`
        }
        if (speaker.linkedin!==null) {
            txtSpeakers += `
            <li class="list-inline-item">
                <a href="${speaker.linkedin}" target="_blank">
                    <i class=fab fa-linkedin"></i>
                </a>
            </li>`
        }
        txtSpeakers += `
                        </ul>
                    </div>
                </div>
                `
        const btnView = document.getElementsByClassName("viewSpeaker")
        for (let i = 0;  i< btnView.length; i++) {
            btnView[i].addEventListener("click", () => {
                for (const speaker of speakers){
                    if (speaker.idSpeaker == btnView[i].getAttribute("id")) {
                        //janela modal
                        swal({
                            title:speaker.nome,
                            text:speaker.bio,
                            imageUrl:speaker.foto,
                            imageWidth: 400,
                            imageHeight: 400,
                            imageAlt: 'foto do orador',
                            animation: false
                        })
                    }
                }

            })
            
        }
    }
    renderSpeakers.innerHTML = txtSpeakers
})()

/* RENDER SPONSORS */
(async()=>{
    const renderSponsors = document.getElementById("renderSponsors")
    let txtSponsors = ""
    const response = await fetch(`${urlBase}/conferences/l/sponsors`)
    const sponsors = await response.json()

    for (const sponsor of sponsors) {
        txtSponsors += `                    
        <div class="col-md-3 col-sm-6">
        <a href="${sponsor.link}" target="_blank">
        <img class="img-fluid d-block mx-auto" src="${sponsor.logo}" alt="${sponsor.nome}">
        </a>
        </div>`
    }
    renderSponsors.innerHTML = txtSponsors
})()

/* CONTACT FORM SEND */
const contactForm = document.getElementById("contactForm")
contactForm.addEventListener("submit", async function() {
    const name=document.getElementById("name").value
    const email=document.getElementById("email").value
    const message=document.getElementById("message").value
    const response = await fetch(`${urlBase}/contacts/emails`,{
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: `email=${email}&name=${name}&subject=${message}`
    })
    const result = await response.json()
    if(result.value.success){
        swal('Envio de Mensagem',result.value.message.pt,'success')
    } else {
        swal('Erro',result.err_message)
    }
});

/** GOOGLE MAPS **/
function myMap(){
//ponto no mapa para loclizar o sitio
const porto=new google.maps.LatLng(41.14961, -8.61099)
const mapProp = {
    center:porto,
    zoom:12,
    scrollwheel:false,
    draggable:false,
    mapTypeId:google.maps.MapTypeId.ROADMAP
}
const map= new google.maps.Map(document.getElementById("googleMap"),mapProp);

//janela de informação
const infowindow = new google.maps.InfoWindow({
    content:"É aqui a conferência!"
})

//marcador
const marker = new google.maps.Marker({
    position:porto,
    map:map,
    title:"WebConference"
})

//abrir janela de informação
marker.addListener('click', function() {
    infowindow.open(map, marker)
})
}