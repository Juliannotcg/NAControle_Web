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
    static Infraestrutura = class {
        static post(resource, data) {
            return fetch(process.env.REACT_APP_INFRAESTRUTURA_API_URL + resource, {
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
            return fetch(process.env.REACT_APP_INFRAESTRUTURA_API_URL + resource, {
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
            return fetch(process.env.REACT_APP_INFRAESTRUTURA_API_URL + resource, {
                method: "DELETE"
            })
                .then(lerComoJson)
                .then(interpretarResposta)
        }

        static get(resource) {

            return fetch(process.env.REACT_APP_INFRAESTRUTURA_API_URL + resource)
                .then(lerComoJson)
                .then(interpretarResposta)
        }
    }

    static Instalacao = class {
        static post(resource, data) {
            return fetch(process.env.REACT_APP_INSTALACAO_API_URL + resource, {
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
            return fetch(process.env.REACT_APP_INSTALACAO_API_URL + resource, {
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
            return fetch(process.env.REACT_APP_INSTALACAO_API_URL + resource, {
                method: "DELETE"
            })
                .then(lerComoJson)
                .then(interpretarResposta)
        }

        static get(resource) {

            if (resource in lookUp) {
                return new Promise((resolve, reject) => window.setTimeout(() => resolve(lookUp[resource]), delay));
            }

            return fetch(process.env.REACT_APP_INSTALACAO_API_URL + resource)
                .then(lerComoJson)
                .then(interpretarResposta)
        }
    }
}

export default API;