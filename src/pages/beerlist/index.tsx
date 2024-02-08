import * as ReactDOM from "react-dom";
import { useEffect, useRef, MutableRefObject } from "react";
import BeerService from "../../services/BeerService";
import useBeerStore from '../../store';
import { Grid, GridColumn as Column, GridPageChangeEvent, GridToolbar as Toolbar } from "@progress/kendo-react-grid";
import { Checkbox, CheckboxChangeEvent } from '@progress/kendo-react-inputs';

type LoadingPanelProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gridRef: MutableRefObject<any>;
};

const loadingPanelMarkup = (
    <div className="k-loading-mask">
      <span className="k-loading-text">Loading</span>
      <div className="k-loading-image" />
      <div className="k-loading-color" />
    </div>
);

const LoadingPanel = (props: LoadingPanelProps) => {
    const { gridRef } = props;
    const gridContent =
      gridRef.current && gridRef.current.querySelector(".k-grid-content");
    return gridContent
      ? ReactDOM.createPortal(loadingPanelMarkup, gridContent)
      : loadingPanelMarkup;
};



const BeerList = () => {
    const beerService = new BeerService(useBeerStore.getState());
    const { beers, isLoading, setPageData, getCurrentPage, getPageSize, skip, take, filter, setFilter  } = useBeerStore();
    const gridRef = useRef(null);
    const currentPage = getCurrentPage();
    const perPage = getPageSize();
    useEffect(() => {
        beerService.fetchBeers(currentPage, perPage, filter)
            .catch((error) => {
                console.error("Error fetching beers:", error);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skip, take, filter]);
    
    const pageChange = (event: GridPageChangeEvent) => {
        setPageData(event.page);
    }
    const handleFilterChange = (event: CheckboxChangeEvent) => {
        setFilter(event.value);
    }

    return (
        <div ref={gridRef} data-testid="beer-list-page">
            {isLoading ? <LoadingPanel gridRef={gridRef} /> : null}
            <Grid 
                pageable={{
                    buttonCount: 5,
                    pageSizes: [5, 10, 15],
                    pageSizeValue: perPage,
                    type: "numeric",
                    previousNext: false,
                    info: false
                }}
                skip={skip}
                take={take}
                onPageChange={pageChange}
                total={325}
                style={{ height: "400px" }} 
                data={beers}
            >
                <Toolbar>
                    <Checkbox disabled={false} label={'Show only Beers with ABV > 8%'} value={filter.abvAbove8} onChange={handleFilterChange} />
                </Toolbar>
                <Column field="id" title="ID" width="100px" />
                <Column field="name" title="Name" width="250px" />
                <Column field="tagline" title="Tagline" width="450px" />
                <Column field="abv" title="ABV" width="80px" />
                <Column field="first_brewed" title="First Brewed" width="100px" />
                <Column field="contributed_by" title="Contributed By" width="200px" />
            </Grid>
        </div>
    );
};

export default BeerList;
