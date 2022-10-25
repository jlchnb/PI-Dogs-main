const {Temperament} = require('../../db');
const axios = require('axios');

const middleTemp = async (req,res) =>{
    const temperamentApi = await axios.get('https://api.thedogapi.com/v1/breeds');
    const temperament = temperamentApi.data.map(el => el.temperaments);
    const tempersEach = temperament.map(t => t === undefined ? [] : t.split(', ')).join().split(',').filter(el => el !== '');
    tempersEach.forEach(el => {
        Temperament.findOrCreate({
            where: {name:el}
        })
    })
    const allTemperament = await Temperament.findAll();
    res.send(allTemperament); 
};

module.exports = {middleTemp};