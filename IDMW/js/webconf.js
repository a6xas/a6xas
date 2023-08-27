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
