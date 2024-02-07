import { useEffect, useState } from "react";
import BeerService from "../../services/BeerService";
import useBeerStore from '../../store';

const BeerList = () => {
    const [ currentPage ] = useState(1);
    const [ perPage ] = useState(10);
    const beerService = new BeerService(useBeerStore.getState());
    const { beers, error, isLoading } = useBeerStore();

    useEffect(() => {
        beerService.fetchBeers(currentPage, perPage)
            .catch((error) => {
                console.error("Error fetching beers:", error);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    {/* Render beers data */}
                    {beers.map((beer) => (
                        <div key={beer.id}>
                            <h2>{beer.name}</h2>
                            <p>{beer.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BeerList;
