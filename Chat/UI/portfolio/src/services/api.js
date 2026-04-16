const BASE_URL = import.meta.env.VITE_API_BASE || 'https://portfolio-chat-server.vercel.app/api/portfolio/v1'

async function request(path, { method = 'GET', headers = {}, body, isForm = false } = {}) {
    const h = {
        ...headers,
    }
    if (!isForm && body) {
        h['Content-Type'] = 'application/json'
    }
    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: h,
        body: isForm ? body : body ? JSON.stringify(body) : undefined,
    })
    if (!res.ok) {
        let errMsg = `Request failed (${res.status})`
        try {
            const data = await res.json()
            errMsg = data?.message || errMsg
        } catch { }
        throw new Error(errMsg)
    }
    if (res.status === 204) return null
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) return res.json()
    return res.text()
}

async function fetchSession() {
    return request('/session/start', { method: 'POST', body: { useBackgroundInfo: true } })
}

async function updateSession(payload) {
    return request('/session/update', { method: 'POST', body: payload })
}

async function deleteSession(id) {
    return request(`/session/${id}`, { method: 'DELETE' })
}

// async function fetchCategories() {
//     return request('/api/categories', { method: 'GET' })
// }

// async function fetchProducts() {
//     return request('/api/products', { method: 'GET' })
// }

// async function createProduct(formData) {
//     return request('/api/products', {
//         method: 'POST',
//         body: formData,
//         isForm: true,
//     })
// }

// async function updateProduct(id, formData) {
//     return request(`/api/products/${id}`, {
//         method: 'PUT',
//         body: formData,
//         isForm: true,
//     })
// }

// async function deleteProduct(id) {
//     return request(`/api/products/${id}`, {
//         method: 'DELETE',
//     })
// }

// async function placeOrder(formData) {
//     return request('/api/order', {
//         method: 'POST',
//         body: formData,
//         isForm: true,
//     })
// }

// async function submitContactForm(formData) {
//     return request('/api/contact', {
//         method: 'POST',
//         body: formData,
//         isForm: true,
//     })
// }

export const api = {
    fetchSession,
    updateSession,
    deleteSession,
}