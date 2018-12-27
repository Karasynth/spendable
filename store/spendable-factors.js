import Immutable from 'immutable';

const initialState = {
    balance: -1500,
    overdraftLimit: 2000,
    data: Immutable.fromJS([
        {
            id: "111",
            name: "Work Paycheck",
            icon: 'briefcase',
            amount: 750,
            value: 750,
            type: "income",
            incremental: false
        },
        {
            id: "112",
            name: "Work Paycheck",
            icon: 'briefcase',
            amount: 750,
            value: 0,
            type: "income",
            incremental: false
        },
        {
            id: "113",
            name: "Child Benefit",
            icon: 'baby',
            amount: 900,
            value: 0,
            type: "income",
            incremental: false
        },
        {
            id: "114",
            name: "Tax Benefit",
            icon: 'bill',
            amount: 500,
            value: 100,
            type: "income",
            incremental: true
        },
        {
            id: "115",
            name: "Mortgage",
            icon: 'house',
            amount: 1000,
            value: 0,
            type: "outcome",
            incremental: false
        }


    ]),
}

export default function counter(state = initialState, action) {
    switch (action.type) {
        case 'addFactor':
            return {
                ...state,
                data: state.data.push(action.data),
            }
        ;
        case 'updateFactor':
            return {
                ...state,
                data: state.data.set(action.index, action.data),
            }
        ;
        case 'setBalance':
            return {
                ...state,
                balance: action.data,
            }
        ;
        case 'setOverdraft':
            return {
                ...state,
                overdraftLimit: action.data,
            }
        ;
        default:
            return state
        ;
    }
  }