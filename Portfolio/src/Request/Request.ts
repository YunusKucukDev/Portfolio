import axios, { AxiosResponse, AxiosError } from 'axios';

// 1. Tek bir yetkili nesne oluşturuyoruz
const agent = axios.create({
    baseURL: "/api/",
    withCredentials: true
});

// 2. Token Ekleme (İsteği gönderirken çalışır)
agent.interceptors.request.use((config) => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
        const user = JSON.parse(userJson);
        if (user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 3. Hata Yönetimi (Yanıt geldiğinde çalışır)
agent.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        const data = error.response?.data as any;
        const status = error.response?.status;

        switch (status) {
            case 401:
                console.error("Yetkisiz erişim! Lütfen giriş yapın.");
                // Opsiyonel: Burada kullanıcıyı login'e yönlendirebilirsin
                break;
            case 400:
                console.error("Geçersiz istek:", data?.message);
                break;
            case 404:
                console.error("Sayfa bulunamadı");
                break;
            case 500:
                console.error("Sunucu hatası");
                break;
        }
        return Promise.reject(error.response);
    }
);

const responseBody = (response: AxiosResponse) => response.data;

// 4. Tüm sorguları 'agent' üzerinden yapacak şekilde güncelledik
const queries = {
    get: (url: string) => agent.get(url).then(responseBody),
    post: (url: string, body: any) => agent.post(url, body).then(responseBody),
    put: (url: string, body: any) => agent.put(url, body).then(responseBody),
    delete: (url: string) => agent.delete(url).then(responseBody),
}

const projectsApi = {
    list: () => queries.get("projects/"),
    details: (id: string) => queries.get(`projects/${id}`),
    createProjects: (formData: any) => queries.post("projects/", formData),
    updateProjects: (formData: any) => queries.put("projects/", formData),
    deleteProjects: (id: string) => queries.delete(`projects/${id}`)
}

const ExperinceApi = {
    list: () => queries.get("experiences/"),
    details: (id: string) => queries.get(`experiences/${id}`),
    createExperince: (formData: any) => queries.post("Experiences", formData),
    updateExperince: (formData: any) => queries.put("Experiences", formData),
    deleteExperince: (id: string) => queries.delete(`Experiences/${id}`)
}

const UserApi = {
    list: () => queries.get("users/"),
    details: (id: string) => queries.get(`users/${id}`),
    createuserinformation: (formData: any) => queries.post("users/createuserinformation", formData),
    updateuserinformation: (formData: any) => queries.put("users/UpdateUserInformation", formData),
}

const AuthApi = {
    login: (formData: any) => queries.post("account/login", formData),
    register: (formData: any) => queries.post("account/register", formData),
    getUser: () => queries.get("account/getuser")
}

const request = {
    projectsApi, ExperinceApi, UserApi, AuthApi
}

export default request;