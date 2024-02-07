import AxiosHelper from "./AxiosHelper";
import { APIRoutes } from "../apiRoutes";
import { BeerStore } from "../store";

class BeerService {
    private BeerAPI: AxiosHelper;
    private beerStore: BeerStore;

    constructor(beerStore: BeerStore) {
        this.BeerAPI = new AxiosHelper(APIRoutes.basePath, 3);
        this.beerStore = beerStore;
    }

    async fetchBeers(pageNumber: number, perPage: number = 10) {
        try {
            this.beerStore.setIsLoading(true);
            const { data, success } = await this.BeerAPI.get(`${APIRoutes.beers.all}?page=${pageNumber}&per_page=${perPage}`);
            if(success){
                // Update BeerStore with fetched data
                this.beerStore.setBeers(data);
                this.beerStore.setIsLoading(false);
            }else{
                this.beerStore.setBeers([]);
                this.beerStore.setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching beers:", error);
            // Update BeerStore with error message
            this.beerStore.setError("Error fetching beers. Please try again later.");
            // Update BeerStore with empty
            this.beerStore.setBeers([]);
            this.beerStore.setIsLoading(false);
            throw error;
        }
    }
}

export default BeerService;
