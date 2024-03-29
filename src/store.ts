import { create } from 'zustand';

type PaginationType = {
    skip: number;
    take: number;
};

export type FilterType = {
    abvAbove8:  boolean;
}

export interface Beer {
    id: number;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image_url: string;
};

export interface BeerStore {
    beers: Beer[];
    error: string | null;
    isLoading: boolean;
    skip: number;
    take: number;
    filter: FilterType, 
    setBeers: (_: Beer[]) => void;
    setError: (_: string | null) => void;
    setIsLoading: (_: boolean) => void;
    setPageData: (_: PaginationType) => void;
    getCurrentPage: () => number;
    getPageSize: () => number;
    setFilter: (_: boolean) => void;
}

const useBeerStore = create<BeerStore>((set, get) => ({
    beers: [],
    error: null,
    isLoading: false,
    skip: 0,
    take: 0,
    filter: {
        abvAbove8: false
    },
    setBeers: (beers) => set({ beers }),
    setError: (error) => set({ error }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setPageData: (page: PaginationType) => set({ skip: page.skip, take: page.take }),
    getCurrentPage: () => {
        const currentPage = get().skip === 0 ? 1 : ( get().skip / get().take ) + 1;
        return currentPage;
    }, 
    getPageSize : () => {
        const perPage = get().take !== 0 ? get().take : 10;
        return perPage;
    }, 
    setFilter: (abvAbove8) => set({ filter: { abvAbove8 }})
}));

export default useBeerStore;