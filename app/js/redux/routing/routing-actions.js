export const NAVIGATE_TO = "ROUTING/NAVIGATE_TO";

export function navigateTo(page, id = "", params){
  return {
    type: NAVIGATE_TO,
    page,
    id,
    params
  };
}
