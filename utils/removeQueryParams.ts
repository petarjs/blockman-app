import { NextRouter } from "next/router";

/**
 * If removeList is empty, the function removes all params from url.
 * @param {*} router
 * @param {*} removeList
 */
export function removeQueryParamsFromRouter(
  router: NextRouter,
  removeList: string[] = []
) {
  if (removeList.length > 0) {
    removeList.forEach((param) => delete router.query[param]);
  } else {
    // Remove all
    Object.keys(router.query).forEach((param) => delete router.query[param]);
  }
  router.replace(
    {
      pathname: router.pathname,
      query: router.query,
    },
    undefined,
    /**
     * Do not refresh the page
     */
    { shallow: true }
  );
}
