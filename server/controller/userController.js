const UserService = require("../service/userService");

class UserController {

        static addUser(req, res) {
                let data = req.body;
                UserService.addUser(data).then(result => {
                        res.json(result);
                        console.log(result)
                }).catch(err => {
                        res.status(500)
                        res.json(err)
                        console.log(err)

                })
        }


        static getUsers(req, res) {
                UserService.getUsers(req.query).then(result => {
                        res.json(result);
                        console.log(result)
                }).catch(err => {
                        res.status(500)
                        res.json(err)
                        console.log(err)

                })
        }
        static editUser(req, res) {
                let data = req.body;
                let id = req.params.id;
                UserService.editUser(id, data).then(result => {
                        res.json(result);
                        console.log(result)
                }).catch(err => {
                        console.log(err)
                        res.status(500)
                        res.json(err)
                        console.log(err)
                })
        }

        
        static deleteUser(req, res) {
                let id = req.params.id;
                UserService.deleteUser(id).then(result => {
                        res.json(result);
                        console.log(result)
                }).catch(err => {
                        console.log(err)
                        res.status(500)
                        res.json(err)
                        console.log(err)
                })
        }

        static authUser(req, res) {
                let data = req.body;
                UserService.authUser(data).then(result => {
                        res.json(result);
                }).catch(err => {
                        res.status(500)
                        res.json(err)
                })
        }


}

module.exports = UserController;