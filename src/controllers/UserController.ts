const {User} = require("../models/index")
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken')

class UserController{
    async registerUser(req,res){
        try {
            const {username,email, password} = req.body;
            const findUserEmail: [] = await User.findOne({where: {email:email}});
            if (findUserEmail) res.json({error: 'There is such a user'});

                let hashPassword: boolean = bcrypt.hashSync(password);
                let user: any = await User.create({ username,email, password: hashPassword});
                res.json({
                    info: {
                        username: user.username,
                        email: user.email,
                    }
                });

        }catch (e) {
            res.json({error: e.message});
        }
    }


    async loginUser(req,res){
        try {
            const {email, password} = req.body;
            const findUser: any = await User.findOne({where:{email}});
            if (!findUser) res.json({error: 'There is such a user'});

            let comparePassword: boolean = bcrypt.compare(password, findUser.password);
            if (!comparePassword) res.json({error: 'wrong password'});

                    let payload: object = {
                        user_id: findUser.user_id,
                        email: findUser.email,
                    };

                    let token: string = jsonwebtoken.sign(payload,process.env.SECRET_KEY,{expiresIn: '10h'});
                    console.log(findUser.user_id)
                    res.json({
                        token,
                        user: {
                            username: findUser.username,
                            email: findUser.email
                        }
                    });


        }catch (e) {
            res.json({error: e.message});
        }
    }


    async editUSer(req,res){
        try{
            const {username,email,password} = req.body;
            const hashPassword: boolean = bcrypt.hashSync(password);

            await User.update({
                username: username,
                email: email,
                password: hashPassword,
            }, {
                where: {id: req.auth.id}
            }
            ).then(data=>{
                res.json({
                    data:{
                        username: data.username,
                        email: data.email
                    }
                })
            });

        } catch (e) {
            res.json({error: e.message});
        }
    }

    async getUsersList(req,res){
        try {
            await User.findAll().then(data=>{
                res.json({data})
            })
        }catch (e) {
            res.json({error: e.message});
        }
    }
}

module.exports = new UserController();