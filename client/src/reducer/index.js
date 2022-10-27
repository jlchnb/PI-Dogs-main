
const initialState = {
    allDogs : [],
    temperaments: [],
    allDogsCopy: [],
    details: []
}


function rootReducer (state = initialState,action){
    switch(action.type){
        case "GET_DOGS":
            action.payload.forEach(dog =>{
                if (!dog.temperaments[0]) {
                    dog.temperaments[0] = "no-temperaments"
                }
                });
            return{
                ...state,
                allDogs: action.payload,
                allDogsCopy: action.payload
            };
            case "GET_BREED":
                return {
                    ...state,
                    allDogs: action.payload,
                };
            case "POST_DOG":
                return{
                    ...state
                }
            case "GET_TEMPERAMENTS":
                const filteresTemp = action.payload.filter((temp) => temp.name !== "");
                return {
                  ...state,
                  temperaments: filteresTemp,
                };
            case "FILTER_BY_TEMP":
                const doggos = state.allDogsCopy
                const tempFiltered = action.payload === "All" ? doggos : doggos.filter(dog => dog.temperaments?.some(r => r === action.payload))
                console.log(state)
                return{
                    ...state,
                    allDogs: tempFiltered
                }
            
            case "ORDER_BY_NAME":
                const sortedName =
                    action.payload === "A-Z" ? state.allDogsCopy.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                        })
                    : state.allDogs.sort((a, b) => {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                        });
                return {
                    ...state,
                    allDogs: sortedName,
                };
            case "ORDER_BY_WEIGHT":
                const sortedWeight =
                    action.payload === "min_weight"
                    ? state.allDogsCopy.sort((a, b) => {
                        if (parseInt(a.weight[0]) > parseInt(b.weight[0])) {
                            return 1;
                        }
                        if (parseInt(b.weight[0]) > parseInt(a.weight[0])) {
                            return -1;
                        }
                        return 0;
                        })
                    : state.allDogsCopy.sort((a, b) => {
                        if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                            return -1;
                        }
                        if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                            return 1;
                        }
                        return 0;
                        });
                return {
                    ...state,
                    allDogs: sortedWeight,
                };
            case "SHOW_DOG_DETAILS":
                let myDetails = action.payload
                if (!myDetails[0].temperaments[0]) {
                    myDetails[0].temperaments[0] = "no temperaments"
                }
                return {
                    ...state,
                    details: myDetails
                };
            
            case "CLEAR_DATA":
                return{...state,details: null}
            default:
            return state;
    }
};

export default rootReducer;