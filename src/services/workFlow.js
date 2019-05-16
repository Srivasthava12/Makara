import { apiHandle } from './axiosWrapper'
import { Log } from './log';

export default class WorkFlow {
    constructor(req, apiDefination) {
        this.req = req
        this.apiDefination = apiDefination
    }

    async execWorkFlow() {
        try {
            const workFlow = this.apiDefination.workFlow;
            const response = await workFlow.start(this.req, this)
            return response;
        } catch (error) {
            Log.error(error);
            throw error;
        }
    }

    async apiCall(serviceName, payload) {
        try {
            const endPoint = this.prepareEndPoint(serviceName)
            const apiOptions = {
                body: payload,
                endPoint
            }
            const call = new apiHandle(apiOptions)
            const response = await call.post()
            return response;
        } catch (error) {
            Log.error(error);
            throw error;
        }
    }

    prepareEndPoint(serviceName) {
        try {
            const serviceType = this.apiDefination.serviceTypes[serviceName]
            const endPoint = `${this.getService(serviceType.name)}/${serviceType.route}`
            return endPoint
        } catch (error) {
            Log.error(error);
            throw error;
        }
    }

    getService(name) {
        try {
            if (name) {
                return 'https://auth-node-app.herokuapp.com'
            }
        } catch (error) {
            Log.error(error);
            throw error;
        }
    }
}