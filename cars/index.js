const {cars} = require('./db')
const { addOrUpdateCar, getCarById } = require('../server/dynamo');
// cars.forEach(({ signalsPerMinute: { infotainment, windows, airBag } }) => {
    //     console.log(infotainment, windows, airBag);
    // })                   
    
    
let outOfRangeValue = 0
cars.forEach(({ signalsPerMinute: { infotainment, windows, airBag } }) => {
    if(infotainment.acceptableMaxValue < infotainment.sum || infotainment.acceptableMinValue > infotainment.sum)
    outOfRangeValue++
    if(windows.acceptableMaxValue < windows.sum || windows.acceptableMinValue > windows.sum)
    outOfRangeValue++
    if(airBag.acceptableMaxValue < airBag.sum || airBag.acceptableMinValue > airBag.sum)
    outOfRangeValue++
})
console.log(outOfRangeValue);


// console.log(cars.length);


const insertCars = async () => {
    for (let i = 0; i < cars.length; i++) {
        await addOrUpdateCar(cars[i])
    }
}
// insertCars()

const getCar = async () =>{
    const car = await getCarById('e252d236-a830-5438-88e3-420aff355d2b')
    console.log(car.Item);
}

// getCar()



//////////////-----  lambda-postCar ------/////////////////////

// const AWS= require("aws-sdk");
// const s3 = new AWS.S3();

// exports.handler = async (event) => {
//     const body = JSON.parse(JSON.stringify(event["body"]))
//     const { car  , car: { vehicleId }  } = body;
//     // const body = JSON.parse(event["body"])
//     // console.log(JSON.parse(event.Body.toString('utf-8')))
//     const key = `${vehicleId}.json`;
//     const props = {
//         Bucket:"sagi-cars",
//         Key:key,
//         Body: JSON.stringify(car)
//     }
//     try {
//         await s3.putObject(props).promise();
//     } catch (err) {
//         console.log(err)
//         return err
//     }
    
//     const response = {
//         statusCode:200,
//         body:"success"
//     };
//     return response;
// };