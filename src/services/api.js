import { Log } from './log';
import WorkFlow from './workFlow'


async function handleWorkFlow(req) {
    try {
        const serviceName = resolveParams(req.params)
        const apiDefination = getApiDefination(serviceName)
        const workFlow = new WorkFlow(req, apiDefination)
        const response = await workFlow.execWorkFlow(apiDefination, req)
        return response
    } catch (error) {
        Log.error(error);
        throw error;
    }
}

function resolveParams(params) {
    try {
        const name = params.api;
        const route = params['0']
        const serviceName = { name, route }
        return serviceName
    } catch (error) {
        Log.error(error);
        throw error;
    }
}

function getApiDefination(serviceName) {
    try {
        const route = serviceName.route.replace('/', '_')
        const path = `../../api_definations/${serviceName.name}_${route}`
        const apiDefination = require(path)
        return apiDefination
    } catch (error) {
        Log.error(error);
        throw error;
    }
}


module.exports = {
    handleWorkFlow: handleWorkFlow
}
