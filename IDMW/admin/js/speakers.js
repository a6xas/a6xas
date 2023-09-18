window.onload = function(){

const urlBase = "https://fcawebbook.herokuapp.com"

const frmSpeaker = document.getElementById("frmSpeakers")
frmSpeaker.addEventListener("submit", async (event) => {
    event.preventDefault()
    if(isNew){
        //pedido html para inserção dos dados do orador
        const response = await fetch(`${urlBase}/speakers`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&bio=${txtBio}`
        }
        )
        const isNewSpeaker = await response.json()
        const newSpeakerId = response.headers.get("Location")
        const newUrl = `${urlBase}/conferences/1/speakers/${newSpeakerId}`

        const response2 = await fetch(newUrl, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
        }
        )
        const isNewSpeaker2 = await response2.json()
    } else {
        //pedido para actualizar dados
        const response = await fetch(`${urlBase}/speakers/${txtSpeakerId}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "PUT",
            body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&bio=${txtBio}`
        }
        )
        const newSpeaker = await response.json()
    }
}
)

const renderSpeakers = async () => {
    const urlBase = "https://fcawebbook.herokuapp.com"
    const tblSpeakers = document.getElementById("tblSpeakers")
    let strHtml = `
    <thead>
    <tr><th class='w-100 text-center bg-warning' colspan='4'>
        Lista de Oradores</th>
    </tr>
    <tr class='bg-info'>
        <th class='w-2'>#</th>
        <th class='w-50'>Nome</th>
        <th class='w-38'>Cargo</th>
        <th class='w-10'>Ações</th>
    </tr>
    </thead><tbody>`

    const response = await fetch(`${urlBase}/conferences/1/speakers`)
    const speakers = await response.json()

    let i = 1
    for (const speaker in speakers) {
        strHtml += `
        <tr>
            <td>${i}</td>
            <td>${speaker.nome}</td>
            <td>${speaker.cargo}</td>
            <td><i id='${participant.idSpeaker}' class='fas fa-edit edit'></i></td>
            <td><i id='${participant.idSpeaker}' class='fas fa-trash-alt remove'></i></td>
        </tr>
        `
        i++
    }
    strHtml += `</tbody>`
    tblSpeakers.innerHTML = strHtml
}

const btnEdit = document.getElementsByClassName("edit")
for (let index = 0; index < btnEdit.length; index++) {
    btnEdit[i].addEventListener("click", ()=>{
        isNew = false  // verificar  nome da variavel
        for (const speaker of speakers) {
            if (speaker.idSpeaker == btnEdit[i].getAttribute("id")){
                document.getElementById("txtSpeakerId").value = speaker.idSpeaker
                document.getElementById("txtName").value = speaker.nome
                document.getElementById("txtJob").value = speaker.cargo
                document.getElementById("txtPhoto").value = speaker.foto
                document.getElementById("txtBio").value = speaker.bio
            }
        }
    }
    )
}

const btnDelete = document.getElementsByClassName("remove")
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete.addEventListener("click", () => {
            //janela modal para confirmar remoção
            swal({
                title: 'Tem a certeza?',
                text: "Isto é irreversível",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Remover'
            }).then(async (result) => {
                if(result.value){
                    //pedido http para remoção da inscrição
                    let speakerId = btnDelete[i].getAttribute("id")
                    try {
                        const response = await fetch(`${urlBase}/conferences/1/participants/${speakerId}`, {method: "DELETE"})
                        const isRemoved = await response.json()
                        swal(
                            'Remoção de orador', 
                            isRemoved.message.pt, 
                            (isRemoved.success) ? 'success' : 'error'
                        )
                        renderParticipants()
                    } catch (err) {
                        swal({
                            type: 'error', 
                            title: 'Remoção de orador',
                            text: err
                        })
                    }
                }
            })
        })
    }

}