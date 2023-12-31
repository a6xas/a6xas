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
                    let participantId = btnDelete[i].getAttribute("id")
                    try {
                        const response = await fetch(`${urlBase}/conferences/1/participants/${participantId}`, {method: "DELETE"})
                        const isRemoved = await response.json()
                        swal(
                            'Remoção de inscrição', 
                            isRemoved.message.pt, 
                            (isRemoved.success) ? 'success' : 'error'
                        )
                        renderParticipants()
                    } catch (err) {
                        swal({
                            type: 'error', 
                            title: 'Remoção de inscrição',
                            text: err
                        })
                    }
                }
            })
        })
    }

}