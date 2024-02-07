import { useEffect, useState } from "react";
import BeerService from "../../services/BeerService";

const BeerList = () => {
    const [ currentPage, _ ] = useState(1);
    const beerService = new BeerService();

    useEffect(() => {
        beerService.fetchBeers(currentPage).then((result) => {
            console.log(result);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    return <> Hello World </>
}

export default BeerList;
