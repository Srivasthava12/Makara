import axios from 'axios'
export class apiHandle {
    constructor(apiOptions) {
        this.body = apiOptions.body || {};
        this.config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        this.endPoint = apiOptions.endPoint;
    }
    async post() {
        try {
            const response = await axios.post(this.endPoint, this.body, this.config);
            return response;
        } catch (ex) {
            if (ex && ex.response && ex.response.data && ex.response.data) throw ex.response.data.Errors;
            throw ex;
        }
    }
}
