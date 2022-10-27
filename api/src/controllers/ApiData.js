const axios = require('axios')
const { Dog, Temperament } = require('../db')


const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const apiInfo = await apiUrl.data.map(dog => {
        let temperamentArray = [];
        if (dog.temperament){
            temperamentArray = dog.temperament.split(", ");
        }

        let weightArray = [];
        if (dog.weight.metric) {
            weightArray = dog.weight.metric.split(" - ");
        }
    
        let heightArray = [];
        if (dog.height.metric) {
            heightArray = dog.height.metric.split(" - ");
        }
        if (!temperamentArray[0]) {
            temperamentArray[0] = "no-temperaments"
          }
        
        if (isNaN(weightArray[0])){
            weightArray[0] = weightArray[1]
        }
        if (isNaN(weightArray[1])){
            weightArray[1] = weightArray[0]
        }
        if (isNaN(weightArray[0]) || isNaN(weightArray[1])){
            weightArray[0] = "Weight not especified"
            weightArray[1] = ""
        }
        if (isNaN(heightArray[0])){
            heightArray[0] = heightArray[1]
        }
        if (isNaN(heightArray[1])){
            heightArray[1] = heightArray[0]
        }
        if (isNaN(heightArray[0]) || isNaN(heightArray[1])){
            heightArray[0] = "Height not especified"
            heightArray[1] = ""
        }

        return {
            id: dog.id,
            name: dog.name,
            years: dog.life_span,
            weight: weightArray,
            height: heightArray,
            temperaments: temperamentArray,
            img: dog.image.url,
        };  
    });
    return apiInfo;
};

const getDbInfo = async () =>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
    })
}

const getAllDogs = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

module.exports = {getAllDogs};