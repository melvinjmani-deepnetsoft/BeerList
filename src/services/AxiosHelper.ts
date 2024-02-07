import axios from "axios";

class AxiosHelper {
    private basePath: string;
    private retries: number;

    constructor(basePath: string, retries: number = 3) {
        this.basePath = basePath;
        this.retries = retries;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async get(path: string, retriesLeft: number = this.retries): Promise<{ data: any, success: boolean, error?: any }> {
        try {
            const response = await axios.get(`${this.basePath}${path}`);
            return { data: response.data, success: true };
        } catch (error) {
            if (retriesLeft > 0) {
                console.log(`Request failed. Retrying... Retries left: ${retriesLeft}`);
                return this.get(path, retriesLeft - 1);
            } else {
                return { data: null, success: false, error };
            }
        }
    }
}

export default AxiosHelper;
