
const bcrypt = require('bcryptjs');
// @ts-ignore
const {User} = require('../models/model')
// @ts-ignore
const jwt = require('jsonwebtoken')

class UserController{
    async registerUser(req,res){
        try {
            const {username,email, password} = req.body;
            const findUserEmail: [] = await User.findOne({where: {email}});

            if (!findUserEmail){
                let hashPassword: boolean = bcrypt.hashSync(password);
                let user: any = await User.create({ username,email, password: hashPassword});
                res.json({
                    info: {
                        username: user.username,
                        email: user.email,
                    }
                });
            }else {
                res.json({error: 'There is such a user'});
            }
        }catch (e) {
            res.json({error: e.message});
        }
    }


    async loginUser(req,res){
        try {
            const {email, password} = req.body;
            const findUser: any = await User.findOne({where:{email}});

            if (findUser) {
                let comparePassword: boolean = bcrypt.compare(password, findUser.password);

                if (comparePassword){
                    let payload: object = {
                        id: findUser.id,
                        email: findUser.email,
                    };

                    let token: string = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: '10h'});
                    res.json({
                        token,
                        user: {
                            username: findUser.username,
                            email: findUser.email
                        }
                    });
                }else {
                    res.json({error: 'wrong password'})
                }

            }else {
                res.json({error: 'wrong email'});
            }

        }catch (e) {
            res.json({error: e.message});
        }
    }


    async editUSer(req,res){
        try{
            const {username,email,password} = req.body;
            const hashPassword: boolean = bcrypt.hashSync(password);

            await User.update({
                username,
                email,
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