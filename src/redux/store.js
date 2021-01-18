import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import Reducer from './Reducers'
import Saga from './Saga'

const initialState = {}

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware, thunk]

const store = createStore(
    Reducer, 
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

sagaMiddleware.run(Saga)

export default store