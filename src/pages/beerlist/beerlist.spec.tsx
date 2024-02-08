import { render } from '@testing-library/react';
import BeerList from '.';

describe('<BeerList />', () => {
    test('renders loading panel when isLoading is true', () => {
      const { getByText } = render(<BeerList />);
      expect(getByText('Loading')).toBeTruthy();
    });

    test('renders grid columns correctly', () => {
      const { getByText } = render(<BeerList />);
      expect(getByText('ID')).toBeTruthy();
      expect(getByText('Name')).toBeTruthy();
      expect(getByText('Tagline')).toBeTruthy();
      expect(getByText('ABV')).toBeTruthy();
      expect(getByText('First Brewed')).toBeTruthy();
      expect(getByText('Contributed By')).toBeTruthy();
    });

});