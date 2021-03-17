import {ProductState } from './state';

import {
  listAddProductState,
  listCompleteState, listRemoveProductState
} from './reducers';
import {ProductInterface} from '../interfaces/product.interface';

const initialState: ProductState = {
  shopName: '',
  ready: false,
  results: [],
  numResults: 0,
};

const results = [
  {
    id:	'FJyPmCGz9MIMSrsGRr4L',
    data: {
      price:	'2',
      title:	'Pistacchio 7',
      category:	'ice',
      id:	'id1',
      employee:	'Giacomo',
      description:	'Gelato sette veli pistacchio',
    }

  },
  {
    id:	'FUMfql75v4QhvqkZCUHd',
    data: {
      title:	'Nuovo',
      price:	'2',
      category:	'slurp',
      employee:	'Aldo',
      description:	'Nuovo prodotto',
    }
  },
  {
    id:	'H10CoWEVOH9wDEAbrNWv',
    data: {
      category:	'Drinks',
      price:	3,
      title:	'Beer',
      description:	'Lager',
      employee:	'Mark',
    }
  }
] as ProductInterface[];

//// begin test

describe('Search reducer features tests', () => {
  describe('default', () => {
    it('should add data to init state', () => {
      const newState = initialState;
      const modifiedState = listAddProductState(newState, results[0]);
      expect(newState.results.length).toBeLessThan(modifiedState.results.length);
    });

    it('should delete item to init state', () => {
      const newState = initialState;
      const filledState = listCompleteState(newState, results);
      const modifiedState = listRemoveProductState(filledState, results[0].id);
      expect(filledState.results.length).toEqual(modifiedState.results.length + 1);
    });
  });

});
