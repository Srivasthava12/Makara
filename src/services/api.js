import { Log } from './log';
import {apiHandle} from './axiosWrapper'

module.exports = {
    async handleWorkFlow(req) {
        try {
            const serviceName = this.resolveParams(req.params)
            const apiDefination = this.getApiDefination(serviceName)
            const response = await this.execWorkFlow(apiDefination, req)
            return response
        } catch (error) {
            Log.error(error);
            throw error;
        }
    },
    resolveParams(params){
        try {
            const name = params.api;
            const route = params['0']
            const serviceName = {name, route}
            return serviceName
        } catch (error) {
            Log.error(error);
            throw error;
        }
    },
    getApiDefination(serviceName){
        try {
            const route = serviceName.route.replace('/','_')
            const path  = `../../api_Definations/${serviceName.name}_${route}`
            const apiDefination = require(path) 
            return apiDefination
        } catch (error) {
            Log.error(error);
            throw error; 
        }
    },
    async execWorkFlow(apiDefination, req){
        try {
            const workFlow = apiDefination.workFlow;
            const response = await workFlow.start(req, this)
            return response;
        } catch (error) {
            Log.error(error);
            throw error; 
        }
    },

    async apiCall(serviceName, payload){
        try {
            const endPoint = `${this.getService(serviceName.name)}/${serviceName.route}`;
            const apiOptions = {
                body : payload,
                endPoint
            }
            const call = new apiHandle(apiOptions)
            const response = await call.post()
            return response;
        } catch (error) {
            Log.error(error);
            throw error; 
        }
    },

    getService(name) {
        try {
            if(name){
                return 'https://auth-node-app.herokuapp.com'
            }
        } catch (error) {
            
        }
    }
}