import delay from "./delay.js";

const lookUp = {};
const lerComoJson = respostaHttp => respostaHttp.json();
const interpretarResposta = json => {
    if (json.success) {
        return json.data;
    }
    return Promise.reject(json.errors);
}

class API {
    static grupo = class {
        static post(resource, data) {
            return fetch(" " + resource, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json-patch+json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
                .then(lerComoJson)
                .then(interpretarResposta);
        }


        static put(resource, data) {
            return fetch(" " + resource, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json-patch+json'
                },
                method: "PUT",
                body: JSON.stringify(data)
            })
                .then(lerComoJson)
                .then(interpretarResposta);
        }


        static delete(resource) {
            return fetch(" URL" + resource, {
                method: "DELETE"
            })
                .then(lerComoJson)
                .then(interpretarResposta)
        }

        static get(resource) {
            return fetch("https://localhost:44399/api/Grupo/" + resource)
                .then(lerComoJson)
                .then(interpretarResposta)
        }
    }
}

export default API;