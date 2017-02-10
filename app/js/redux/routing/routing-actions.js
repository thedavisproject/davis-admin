export const NAVIGATE_TO = "ROUTING/NAVIGATE_TO";
export const REDIRECT_TO = "ROUTING/REDIRECT_TO";

export function navigateTo(page = "", id = "", args = {}){
  return {
    type: NAVIGATE_TO,
    meta: {
      replaceState: false // createRoutingMiddleware is aware of this
    },
    payload: {
      page,
      id,
      args
    }
  };
}

// redirect to a page without messing with the location history
export function redirectTo(page = "", id = "", args = {}){
  return {
    type: REDIRECT_TO,
    meta: {
      replaceState: true // createRoutingMiddleware is aware of this
    },
    payload: {
      page,
      id,
      args
    }
  };
}
