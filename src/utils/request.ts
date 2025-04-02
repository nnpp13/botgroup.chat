const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export async function request(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }


    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers,
        });

        // 如果返回 401，清除 token 并跳转到登录页
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            throw new Error('Unauthorized');
        }

        if (!response.ok) {
            throw new Error('Request failed');
        }

        return response;
    } catch (error) {
        // 如果是网络错误或其他错误，也可以处理
        console.error('Request error:', error);
        throw error;
    }
} 