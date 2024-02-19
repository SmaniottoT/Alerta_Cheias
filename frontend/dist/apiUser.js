import axios from "axios";
export var user = axios.create({
    baseURL: "http://localhost:3000",
});
user.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status == 401) {
        window.location.replace("/pages/login/login.html");
    }
    return error;
});
export var validateAuth = function () {
    var token = localStorage.getItem("token");
    if (!token) {
        window.location.replace("/pages/login/login.html");
    }
    else {
        user.defaults.headers.common.Authorization = "Bearer ".concat(token);
    }
};
