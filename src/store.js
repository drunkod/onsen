export default {
  modules: {
    navigator: {
      strict: true,
      namespaced: true,
      state: {
        stack: [],
        options: {}
      },
      mutations: {
        push(state, page) {
          state.stack.push(page);
        },
        pop(state) {
          if (state.stack.length > 1) {
            state.stack.pop();
          }
        },
        replace(state, page) {
          state.stack.pop();
          state.stack.push(page);
        },
        reset(state, page) {
          state.stack = [page || state.stack[0]];
        },
        options(state, newOptions = {}) {
          state.options = newOptions;
        }
      }
    },

    splitter: {
      strict: true,
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle(state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen;
          } else {
            state.open = !state.open;
          }
        }
      }
    },

    tabbar: {
      strict: true,
      namespaced: true,
      state: {
        index: 3
      },
      mutations: {
        set(state, index) {
          state.index = index;
        }
      }
    },

    search: {
      strict: true,
      namespaced: true,
      state: {
        open: false,
        boroughSearch: [],
        ShopSearch: [],
        MasterSearch: [],
        parkSearch: [],
        onlinebikeSearch: [],
        eventbikeSearch: [],
        roadbikeSearch: [],
        easyrouteSearch: [],
        routeSearch: [],
      },
      mutations: {
        open(state, isOpen) {
          if (isOpen) {
            state.open = true;
          }

        },
        boroughSearch(state, Search) {

            state.boroughSearch.push(Search)
          }


      }
    },

    map: {
      strict: true,
      namespaced: true,
      state: {
        bounds: '',
        select_borough: '',
        actionSheetInfo: {title: '', adress: '', phone: '', open: '', type: '', animation: 'default', animationOptions: {duration: 0.2, delay: 1, timing: 'ease-in'}, visible: false}
      },
      mutations: {
        set_bounds(state, bounds) {
            state.bounds = bounds
        },
        set_select_borough(state, layer_id) {
            state.select_borough = layer_id
        },
        set_actionSheetInfo(state, title) {
            state.actionSheetInfo = {title: title, adress: 'Челябинск', type: 'район', animation: 'default', visible: true}
        }


      }
    }

  }
};
