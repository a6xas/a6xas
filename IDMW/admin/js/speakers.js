window.onload = function(){

const urlBase = "https://fcawebbook.herokuapp.com"

const frmSpeaker = document.getElementById("frmSpeakers")
frmSpeaker.addEventListener("submit", async (event) => {
    event.preventDefault()
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
for (let index = 0; index < array.length; index++) {
    const element = array[index];
    
}



}