import AxiosHelper from "./AxiosHelper";

class BeerService {

    constructor() { }

    fetchBeers(pageNumber: number, perPage: number = 10) { 
        const API = new AxiosHelper(`/beers?page=${pageNumber}&per_page=${perPage}`);
        return Promise.resolve(
            API.getWithRetry()
                .catch((error) => {
                    console.error(error);
                    return Promise.reject(error);
                })
        )
    }
}

export default BeerService;