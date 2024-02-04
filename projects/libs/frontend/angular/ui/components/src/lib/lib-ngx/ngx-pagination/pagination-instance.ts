export interface PaginationInstance {
  /**
   * An optional ID for the pagination instance. Only useful if you wish to
   * have more than once instance at a time in a given component.
   */
  id: string;
  /**
   * The number of items per paginated page.
   */
  itemsPerPage: number;
  /**
   * The current (active) page.
   */
  currentPage: number;
  /**
   * The total number of items in the collection. Only useful when
   * doing server-side paging, where the collection size is limited
   * to a single page returned by the server API.
   *
   * For in-memory paging, this property should not be set, as it
   * will be automatically set to the value of  collection.length.
   */
  totalItems: number;
}


export type PaginationParams = {
  /**
 * An optional ID for the pagination instance. Only useful if you wish to
 * have more than once instance at a time in a given component.
 */
  itemsPerPage: number;
  /**
   * The current (active) page.
   */
  currentPage: number;
  /**
   * The total number of items in the collection. Only useful when
   * doing server-side paging, where the collection size is limited
   * to a single page returned by the server API.
   *
   * For in-memory paging, this property should not be set, as it
   * will be automatically set to the value of  collection.length.
   */
  totalItems: number;
}

/**
 * Represents an interface for handling pagination in an Angular application.
 */
export interface AppPagination {
  /**
   * Pagination parameters that define how the pagination should behave.
   */
  paginationParams: PaginationParams;

  /**
   * Callback function triggered when the page index is changed.
   *
   * @param index The new index of the current page.
   */
  onPageChanged(index: number): void;
}

