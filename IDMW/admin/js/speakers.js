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
}
)



}