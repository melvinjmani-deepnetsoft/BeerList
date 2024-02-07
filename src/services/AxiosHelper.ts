import axios from "axios";
const basePath = "https://api.punkapi.com/v2";

class AxiosHelper { 
    private path: string;
    private retries: number;
    
    //number of retries set to 3
    constructor(path: string, retries: number = 3) { 
        this.path = path;
        this.retries = retries;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getWithRetry(retriesLeft = this.retries): Promise<any> {
        try {
            const response = await axios.get(`${basePath}/${this.path}`);
            return response.data;
        } catch (error) {
            if (retriesLeft > 0) {
                console.log(`Request failed. Retrying... Retries left: ${retriesLeft}`);
                return this.getWithRetry(retriesLeft - 1);
            } else {
                // Retries exhausted, throw the error
                throw error;
            }
        }
    }
}

export default AxiosHelper;