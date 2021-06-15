import { combineReducers } from 'redux';
import reducers from './index.js';

const rootReducers = combineReducers({
    Clothbea : reducers
})

export default rootReducers