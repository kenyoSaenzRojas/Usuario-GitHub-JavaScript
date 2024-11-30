const API_GITHUB = 'https://api.github.com'

// template string
const API_GITHUB_USER = `${API_GITHUB}/users`

const profilePhoto = document.getElementById('photo')
const nombre = document.getElementById('nombre')
const link = document.getElementById('link')

// obteniendo los datos para mostrar en pantalla
const inputUser = document.getElementById('user')
const button = document.getElementById('buscarPerfil')

button.addEventListener('click', () => {
    const username = inputUser.value
    console.log(username)

    cargarPerfil(username)
})

// ------------- obtener los datos
const cargarPerfil = async (username) => {
    const userData = JSON.parse(localStorage.getItem('user'))
    // validamos si ya existe el usuario
    let user = userData

    if(username) {
        if (userData) {
            if (username != userData.username) {
                const response = await fetch(`${API_GITHUB_USER}/${username}`)
                const data = await response.json()
        
                user = {
                    username: data.login,
                    photo: data.avatar_url,
                    name: data.name,
                    profileLink: data.html_url
                }
        
                localStorage.setItem('user', JSON.stringify(user))
            } else {
                user = {
                    username: userData.login,
                    photo: userData.photo,
                    name: userData.name,
                    profileLink: userData.profileLink
                }
        
                console.log('obteniendo los datos desde el storage')
            }

        } else {
            if(username != null || username !== userData.username) {
                const response = await fetch(`${API_GITHUB_USER}/${username}`)
                const data = await response.json()
        
                user = {
                    username: data.login,
                    photo: data.avatar_url,
                    name: data.name,
                    profileLink: data.html_url
                }
        
                localStorage.setItem('user', JSON.stringify(user))
            }

            console.log('obteniendo los datos con fetch')
        }
    }

    // mostrando los datos en la pantalla

    if (user) {
        profilePhoto.src= user.photo,
        link.href=user.profileLink, 
        nombre.innerHTML=user.name

    } else {
        return
    }

}
