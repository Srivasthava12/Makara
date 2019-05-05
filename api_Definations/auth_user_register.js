module.exports = {
    name:"auth_users_register",
    method: "POST",
    workFlow: {
        start: async function (req, context) {
            let payload = {
                name: req.body.name,
                email: req.body.email,
                userName: req.body.userName,
                password: req.body.password
            };
            const response = await this.register(req,context, payload)
            return response
        },
        register: async function (req,context, payload) { 
            const serviceName = context.resolveParams(req.params) 
            const response = await context.apiCall(serviceName, payload)
            return response.data
        }
    }
}