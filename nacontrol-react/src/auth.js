import axios from "axios";

export const isAuthenticated = () => {
    localStorage.setItem('token', 'Treinaweb');

    axios.get('https://api.github.com/users/Juliannotcg')
         .then(function(response){
            console.log(response.data); // ex.: { user: 'Your User'}
            console.log(response.status); // ex.: 200
         }).catch(function(response){
            console.log(response.data); // ex.: { user: 'Your User'}
            console.log(response.status);
         });
};