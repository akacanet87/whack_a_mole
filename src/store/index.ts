interface State {
  gameTime: number,
  gameScore: number,
  xAxis: number,
  yAxis: number,
  moleLimit: number,
  totalHoles: number,
}

interface Getters {
  [index: string]: () => number
  GAME_TIME: () => number
  GAME_SCORE: () => number
  X_AXIS: () => number
  Y_AXIS: () => number
  MOLE_LIMIT: () => number
  TOTAL_HOLES: () => number
}

const state = {
  gameTime: 0,
  gameScore: 0,
  xAxis: 0,
  yAxis: 0,
  moleLimit: 0,
  totalHoles: 0,
} as State

const getters = {
  GAME_TIME: () => {
    return state.gameTime
  },
  GAME_SCORE: () => {
    return state.gameScore
  },
  X_AXIS: () => {
    return state.xAxis
  },
  Y_AXIS: () => {
    return state.yAxis
  },
  MOLE_LIMIT: () => {
    return state.moleLimit
  },
  TOTAL_HOLES: () => {
    return state.totalHoles
  },
} as Getters

const mutations: { [key: string]: Function } = {
  SET_GAME_TIME: (gameTime: number) => {
    state.gameTime = gameTime
  },
  SET_GAME_SCORE: (gameScore: number) => {
    state.gameScore = gameScore
  },
  SET_X_AXIS: (xAxis: number) => {
    state.xAxis = xAxis
  },
  SET_Y_AXIS: (yAxis: number) => {
    state.yAxis = yAxis
  },
  SET_MOLE_LIMIT: (moleLimit: number) => {
    state.moleLimit = moleLimit
  },
  SET_TOTAL_HOLES: (totalHoles: number) => {
    state.totalHoles = totalHoles
  },
}

const actions: { [key: string]: Function } = {
  GAME_TIME: (gameTime: number) => {
    const commit = mutations['SET_GAME_TIME']
    commit(gameTime)
  },
  GAME_SCORE: (gameScore: number) => {
    const commit = mutations['SET_GAME_SCORE']
    commit(gameScore)
  },
  X_AXIS: (xAxis: number) => {
    const commit = mutations['SET_X_AXIS']
    commit(xAxis)
  },
  Y_AXIS: (yAxis: number) => {
    const commit = mutations['SET_Y_AXIS']
    commit(yAxis)
  },
  MOLE_LIMIT: (moleLimit: number) => {
    const commit = mutations['SET_MOLE_LIMIT']
    commit(moleLimit)
  },
  TOTAL_HOLES: (totalHoles: number) => {
    const commit = mutations['SET_TOTAL_HOLES']
    commit(totalHoles)
  },
}

const store = {
  getters: (type: string) => {
    const getter = getters[type]
    if (typeof getter === 'function') {
      return getter()
    }
  },
  dispatch: (type: string, data: unknown) => {
    const action = actions[type]
    if (typeof action === 'function') {
      action(data)
    }
  },
}

export default store