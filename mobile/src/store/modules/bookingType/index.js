/* @flow */

type Action = {
  type: string,
}
export type ChooseLocationListView = boolean


const TOGGLE_LOCATION_LISTVIEW = 'TOGGLE_LOCATION_LISTVIEW'

export default function chooseLocationListView(state: ChooseLocationListView = true, action: Action): ChooseLocationListView {
  switch (action.type) {
    case TOGGLE_LOCATION_LISTVIEW:
      state = !state
    default:
      state = state
  }
  return state
}

export const toggleListView = (): Action => ({
  type: TOGGLE_LOCATION_LISTVIEW,
})
