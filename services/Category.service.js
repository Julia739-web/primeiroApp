const url = 'http://localhost:3000'

export async function getCategories() {
    const request = `${url}/categorias`
    try {
        const response = await fetch(request, {
            method: 'GET'
        })
        const data = await response.json()
        return data.data
    } catch (e) {

    }
}

export async function createCategory(category) {
    const request = `${url}/categorias`;
    try {
        const response = await fetch(request, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        const data = await response.json()
        return data

    } catch (e) {

    }
}

export async function updateCategory(id, category) {
    const request = `${url}/categorias/${id}`

    try {
        const response = await fetch(request, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })

        const data = await response.json()
        return data
    } catch (e) {

    }
}

export async function deleteCategory(id) {
    const request = `${url}/categorias/${id}`
    try {
        const response = await fetch(request, {
            method: 'DELETE'
        })
        const data = await response.json()
        return data
    } catch (e) {

    }
}