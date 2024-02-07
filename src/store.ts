import create from 'zustand';

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
    setBeers: (_: Beer[]) => void;
    setError: (_: string | null) => void;
    setIsLoading: (_: boolean) => void;
}

const useBeerStore = create<BeerStore>((set) => ({
    beers: [],
    error: null,
    isLoading: false,
    setBeers: (beers) => set({ beers }),
    setError: (error) => set({ error }),
    setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useBeerStore;