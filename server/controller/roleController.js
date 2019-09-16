const RoleService = require("../service/roleService");

class RoleController {

        static assignRole(req, res) {
                let data = req.body;
                RoleService.assignRole(data).then(result => {
                        res.json(result);
                }).catch(err => {
                        res.status(500)
                        res.json(err)
                        console.log(err)

                })
        }

}

module.exports = RoleController;