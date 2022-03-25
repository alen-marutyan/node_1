const {Car, Brand, Model} = require("../models/index")

class CarController{
    async createCar(req,res){

        try{
            let findCar = await Car.findOne({where: {license_plate: req.body.license_plate}});
            if (findCar) return res.json({error: 'have this license_plate'});

            let createCar = await Car.create({license_plate: req.body.license_plate, user_id: req.auth.user_id});
            let createModel:any = await Model.create({name: req.body.model, car_id: createCar.car_id});
            let createBrand:any = await Brand.create({name: req.body.brand, model_id: createModel.model_id});

            res.json({
                data: {
                    license_plate: createCar.license_plate,
                    model: createModel.name,
                    brand: createBrand.name,
                }
            });
        }catch (e) {
            res.json({error: e.message});
        }

    }

    async editCar(req,res){
        try {

            let updateCar:{} = await Car.update(
                {license_plate: req.body.license_plate},
                {where: {car_id: req.params.id}}
            );

            let updateModel:{} = await Model.update(
                {
                    name: req.body.model,
                },
                {
                    where: {
                        car_id: req.params.id
                    }
                }
            );

            let updateBrand = await Model.findOne({where: {car_id: req.params.id}}).then(data=>{
                Brand.update(
                    {
                        name: req.body.brand,
                    },
                    {
                        where: {
                            id: data.model_id
                        }
                    }
                );
            }).catch(err=>{
                res.json({error: err.message})
            });

            Promise.all([updateCar, updateModel, updateBrand]).then(()=>{
                res.json({data: 'updated!'});
            }).catch(e=>{
                res.json({error: e.message});
            })

        }catch (e) {
            res.json({error: e.message});
        }

    }

    async removeCar(req,res){

        try {
            await Car.destroy({where:{car_id:req.params.id}});
            res.send('removed!')
        }catch (e) {
            res.json({error: e.message});
        }
    }

    async listCar(req,res){
        try {
            await Car.findAll({
                where:{
                    user_id: req.auth.user_id
                },
                include: [{
                    model: 'User', as: "email"
                }]
            }).then(data=>{
                res.json({data})
            })

        }catch (e) {
            res.json({error: e.message});
        }
    }

}

module.exports = new CarController();