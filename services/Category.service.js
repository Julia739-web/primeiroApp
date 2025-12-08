const url = 'http://localhost:3000'

export async function getLivros() {
    const request = `${url}/livros`
    try {
        const response = await fetch(request, {
            method: 'GET'
        })
        const data = await response.json()
        return data.data
    } catch (e) {

    }
}

export async function createLivros(livros) {
    const request = `${url}/livros`;
    try {
        const response = await fetch(request, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livros)
        })
        const data = await response.json()
        return data

    } catch (e) {

    }
}

export async function updateLivros(id, livros) {
    const request = `${url}/livros/${id}`

    try {
        const response = await fetch(request, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livros)
        })

        const data = await response.json()
        return data
    } catch (e) {

    }
}

export async function deleteLivros(id) {
    const request = `${url}/livros/${id}`
    try {
        const response = await fetch(request, {
            method: 'DELETE'
        })
        const data = await response.json()
        return data
    } catch (e) {

    }
}