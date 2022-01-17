import cloneDeep from 'lodash/cloneDeep';

import { ADD, REMOVE, CLEAR } from './constants';

export const initCart = {
    items: {},
    total: 0,
    totalAmount: 0,
};

const reducer = (state, action) => {
    let total, totalAmount, items;

    switch (action.type) {
        case ADD:
            total = state.total + action.payload.amount;
            totalAmount = state.totalAmount + action.payload.amount * action.payload.price;

            items = cloneDeep(state.items);

            if (items[action.payload.id]) {
                items[action.payload.id].amount += action.payload.amount;
            } else {
                items[action.payload.id] = action.payload;
            }

            break;
        case REMOVE:
            items = cloneDeep(state.items);
            items[action.payload].amount -= 1;

            total = state.total - 1;
            totalAmount = state.totalAmount - items[action.payload].price;

            if (items[action.payload].amount === 0) delete items[action.payload];

            break;
        case CLEAR:
            return { ...initCart };
        default:
            throw new Error('INVALID ACTION!');
    }

    return {
        items,
        total,
        totalAmount,
    };
};

export default reducer;
