import AxiosHelper from "./AxiosHelper";
import { APIRoutes } from "../apiRoutes";
import { BeerStore, FilterType } from "../store";

class BeerService {
    private BeerAPI: AxiosHelper;
    private beerStore: BeerStore;

    constructor(beerStore: BeerStore) {
        this.BeerAPI = new AxiosHelper(APIRoutes.basePath, 3);
        this.beerStore = beerStore;
    }

    async fetchBeers(pageNumber: number, perPage: number = 10, filter: FilterType = { abvAbove8 : false } ) {
        try {
            this.beerStore.setIsLoading(true);
            let url = `${APIRoutes.beers.all}?page=${pageNumber}&per_page=${perPage}`;
            if(filter.abvAbove8){
                url += `&abv_gt=8`;
            }
            const response = await this.BeerAPI.get(url);
            if(response && response.data && response.success){
                const { data } = response;
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
