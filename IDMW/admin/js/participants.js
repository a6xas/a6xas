window.onload = function () {
    const renderParticipants = async () => {
        const urlBase = "https://fcawebbook.herokuapp.com"
        const tblParticipants = document.getElementById("tblParticipants")
        let strHtml = `
        <thead>
        <tr><th class='w-100 text-center bg-warning' colspan='4'>
            Lista de Participantes</th>
        </tr>
        <tr class='bg-info'>
            <th class='w-2'>#</th>
            <th class='w-50'>Nome</th>
            <th class='w-38'>Email</th>
            <th class='w-10'>Ações</th>
        </tr>
        </thead><tbody>`

        const response = await fetch(`${urlBase}/conferences/1/participants`)
        const participants = await response.json()

        let i = 1
        for (const participant in participants) {
            strHtml += `
            <tr>
                <td>${i}</td>
                <td>${participant.nomeParticipante}</td>
                <td>${participant.idParticipante}</td>
                <td><i id='${participant.idParticipante}' class='fas fa-trash-alt remove'></i></td>
            </tr>
            `
            i++
        }
        strHtml += `</tbody>`
        tblParticipants.innerHTML = strHtml
    }
}