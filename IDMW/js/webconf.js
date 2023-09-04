window.onload = function () {
    //código para manipular DOM

    const btnRegister = document.getElementById("btnRegister")
    // Registar participante
    btnRegister.addEventListener("click", function () {
        swal({
            title: "Inscrição na WebConference",
            html:
                '<input id="txtName" class="swal2-input" placeholder="nome">' +
                '<input id="txtEmail" class="swal2-input" placeholder="e-mail">',
            showCancelButton: true,
            confirmButtonText: "Inscrever",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const name = document.getElementById('txtName').value
                const email = document.getElementById('txtEmail').value
                const url_base = "https://fcawebbook.herokuapp.com"
                try {
                    const response = await fetch(`${url_base}/conferences/1/participants/${email}`, {
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
                    swal({ title: "Inscrição feita com sucesso!" })
                } else {
                    swal({ title: `${result.value.err_message}` })
                }
            }
        });
    });

};

(async() => {
    const renderSpeakers = document.getElementById("renderSpeakers")
    let txtSpeakers = ""
    const response = await fetch('${url_base}/conferences/1/speakers')
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

(async()=>{
    const renderSponsors = document.getElementById("renderSponsors")
    let txtSponsors = ""
    const response = await fetch('${urlBase}/conferences/l/sponsors')
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