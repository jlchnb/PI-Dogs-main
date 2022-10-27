const {getAllDogs} = require('../../controllers/ApiData');
const {Dog, Temperament} = require('../../db');

//Dog get !
const middleDogGet = async (req,res) =>{
    const name = req.query.name
    let totalDogs = await getAllDogs();
    if(name){
        let dogName = await totalDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send('That dog does not exist');
    }else{
        res.status(200).send(totalDogs)
    }
}

//Dog post !
const middleDogPost = async(req,res,next) =>{
try{
    let {
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      years,
      temperaments,
      img
    } = req.body

    const fixedHeight = []
    const minHeight = min_height;
    const maxHeight = max_height;
    fixedHeight.push(minHeight, maxHeight)
 
    const fixedWeight = []
    const minWeight = min_weight;
    const maxWeight = max_weight;
    fixedWeight.push(minWeight, maxWeight)
 
    let dog = await Dog.create({
     name,
     height: fixedHeight,
     weight: fixedWeight,
     years,
     img: img ? img : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Dog_silhouette.svg/1034px-Dog_silhouette.svg.png",
    })
 
    const associatedTemp = await Temperament.findAll({
        where: {name:temperaments}
    })
 
    dog.addTemperament(associatedTemp);
 
    res.status(200).send("Dog created succesfully!")
}catch(error){
  next(error)
}}


// Get dog by ID !
const middleDogIdGet = async(req,res) =>{
  try{
    const id = req.params.id;
    const totalDogs = await getAllDogs()
    if(id){
        let dogId = await totalDogs.filter(dog => dog.id == id)
        dogId.length?
        res.status(200).json(dogId):
        res.status(404).send('Dog not found')
    }
  }catch(err){
    next(err)
  }
}


module.exports = {middleDogGet, middleDogPost, middleDogIdGet};