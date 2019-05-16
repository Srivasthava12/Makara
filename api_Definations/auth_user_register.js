module.exports = {
    name:"auth_users_register",
    method: "POST",
    serviceTypes:{
        register:{
            name:"auth-node",
            route:"user/register"
        }
    },
    workFlow: {
        start: async function (req, context) {
            let payload = {
                name: req.body.name,
                email: req.body.email,
                userName: req.body.userName,
                password: req.body.password
            };
            const response = await this.register(context, payload)
            return response
        },
        register: async function (context, payload) { 
            const response = await context.apiCall("register", payload)
            return response.data
        }
    }
}