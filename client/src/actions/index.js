import axios from 'axios';

// Se conecta el front con el back !
export function getDogs(){
    return async function(dispatch){
        //Por default me agrega el get junto al axios (axios.get)
        var json = await axios('http://localhost:3001/dogs',{});
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        });
    }
};

export function getTemperaments(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/temperament',{});
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: json.data,
        });
    }
};

export function filterDogsByTemperament(payload){
    console.log(payload)
    return{
        type: "FILTER_BY_TEMP",
        payload: payload
    }
};

export function getBreed(payload) {//dogs by name
    return async function (dispatch) {//Dispatch que podemos usar gracias a la asincronia provista por el middleware thunk
        try {
            var json = await axios.get(`http://localhost:3001/dogs?name=${payload}`)
            console.log(json)
            return dispatch ({
                type: "GET_BREED",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function OrderByName(payload) {
    return { 
        type: "ORDER_BY_NAME",
        payload
    }
};

export function OrderByWeight(payload){
    return{
        type: "ORDER_BY_WEIGHT",
        payload
    }
};

export function showDogDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs/"+id, {});
            console.log(json.data[0],"soy el res",id)
        return dispatch({
            type: "SHOW_DOG_DETAILS",
            payload: json.data
        });
        } catch (error) {
            console.log(error);
        }
    }
};

export function postDog(payload) {
    return async function () {
        const data = await axios.post("http://localhost:3001/dogs", payload); //axios.post("http://localhost:3001/dog"
        return data;
    }
};

export function clearData(payload){
    return{
        type: "CLEAR_DATA",
        payload
    }
}