const {Car,model,brand_name} = require('../models')

class CarController{
    async createCar(req,res){

        try {

            let findCar = await Car.findOne({where: {license_plate: req.body.license_plate}});
            if (findCar) return res.json({error: 'have this license_plate'});

            let create_model_car:any = await model.create({name: req.body.model_car, year: req.body.model_year});
            let create_brand_name_car:any = await brand_name.create({
                name: req.body.brand_name_car,
                author: req.body.brand_author,
                country: req.body.brand_country,
                year: req.body.brand_year
            });

            let create:any = await Car.create({
                license_plate: req.body.license_plate,
                model_car: create_model_car.id,
                brand_name_car: create_brand_name_car.id,
                userId: req.auth.id,
            });

            res.json({
                data: {
                    license_plate: create.license_plate,
                    model_car: create_model_car.name,
                    brand_name_car: create_brand_name_car.name,
                }
            });

        }catch (e) {
            res.json({error: e.message});
        }

    }

    async editCar(req,res){
        try {
            let update_car_plate:{} = await Car.update(
                {license_plate: req.body.license_plate},
                {where: {id: req.params.id}}
            )

            let create_model_car:{} = await model.update(
                {
                    name: req.body.model_car,
                    year: req.body.model_year
                },
                {where: {id: req.params.id}}
            );
            let create_brand_name_car:{} = await brand_name.update(
                {
                    name: req.body.brand_name_car,
                    country: req.body.brand_country,
                    author: req.body.brand_author,
                    year: req.body.brand_year
                },
                {where: {id: req.params.id}}
            );

            Promise.all([update_car_plate, create_model_car, create_brand_name_car]).then(()=>{
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

            await Car.findOne({
                where:{
                    id: req.params.id
                }
            }).then(data=>{
                model.destroy({where:{id: data.model_car}});
                brand_name.destroy({where:{id: data.brand_name_car}});
                Car.destroy({where: {id: req.params.id}})
                res.json({data: 'removed!'})
            })
        }catch (e) {
            res.json({error: e.message});
        }
    }

    async listCar(req,res){
        try {
            await Car.findAll({
                where:{
                    userId: req.auth.id
                },
                include: [{
                    model: brand_name, as: "brand_name",
                },{
                    model: model, as: 'model'
                }]
            }).then(data=>{
                let arr:any = [];

                data.forEach(el=>{
                    arr.push({
                        license_plate: el.license_plate,
                        model_car: el.model.name,
                        model_year: el.model.year,
                        brand_name_car: el.brand_name.name,
                        brand_country: el.brand_name.country,
                        brand_author: el.brand_name.author,
                        brand_year: el.brand_name.year,
                    })
                })
                res.json({data: arr})
            })

        }catch (e) {
            res.json({error: e.message});
        }
    }

}

module.exports = new CarController();