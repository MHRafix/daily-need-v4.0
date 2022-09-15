import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight
} from "react-icons/md";

// table data pagination
export const TablePagination = ({ dependency }) => {
  const {
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageIndex,
  } = dependency;

  return (
    <div className="flex items-center justify-end my-10">
      <button
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        id={!canPreviousPage ? "form_btn_disabled" : "form_btn"}
        style={{
          borderRadius: "0px",
          height: "45px",
          padding: "10px",
          fontSize: "18px",
        }}
      >
        <MdOutlineKeyboardArrowLeft />
      </button>

      <span id="pagination_content">
        {/* Page */}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </span>

      <button
        onClick={() => nextPage()}
        disabled={!canNextPage}
        id={!canNextPage ? "form_btn_disabled" : "form_btn"}
        style={{
          borderRadius: "0px",
          height: "45px",
          padding: "10px",
          fontSize: "18px",
        }}
      >
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
};

// table data Sorter
export const TableDataSorter = ({ dependency }) => {
  const {
    setPageSize,
    pageSize,
    handleTypeFilter,
    handleStatusFilter,
    handleResetFilter,
    show,
    active,
  } = dependency;

  return (
    <div id="table_sorter_wrapper">
      <div id="sorter_input_wrapper">
        Show
        <select
          className="sorting_input"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        entries
      </div>

      {show ? (
        <div id="table_data_filter_wrapper">
          <div
            id={active === "reset" ? "filter_btn_active" : "filter_btn"}
            onClick={() => handleResetFilter("reset")}
          >
            <button>All Products</button>
          </div>
          <div
            id={active === "fixed-sale" ? "filter_btn_active" : "filter_btn"}
            onClick={() => handleTypeFilter("fixed-sale", "fixed-sale")}
          >
            <button>Fixed Sale</button>
          </div>
          <div
            id={active === "on-sale" ? "filter_btn_active" : "filter_btn"}
            onClick={() => handleTypeFilter("on-sale", "on-sale")}
          >
            <button>On Sale</button>
          </div>
          <div
            id={active === "in-stock" ? "filter_btn_active" : "filter_btn"}
            onClick={() => handleStatusFilter("in-stock", "in-stock")}
          >
            <button>In-Stock</button>
          </div>
          <div
            id={active === "stock-out" ? "filter_btn_active" : "filter_btn"}
            onClick={() => handleStatusFilter("stock-out", "stock-out")}
          >
            <button>Stock-Out</button>
          </div>
        </div>
      ) : (
        <div id="table_data_filter_wrapper">
          <div
            id={active === "reset" ? "filter_btn_active" : "filter_btn"}
            onClick={() => handleResetFilter("reset")}
          >
            <button>All Orders</button>
          </div>
          <div
            id={active === "shipped" ? "filter_btn_active" : "filter_btn"}
            onClick={() => handleStatusFilter("shipped", "shipped")}
          >
            <button>Shipped Orders</button>
          </div>
          <div
            id={active === "canceled" ? "filter_btn_active" : "filter_btn"}
            onClick={() => handleStatusFilter("canceled", "canceled")}
          >
            <button>Canceled Orders</button>
          </div>
          <div
            id={active === "pendding" ? "filter_btn_active" : "filter_btn"}
            onClick={() => handleStatusFilter("pendding", "pendding")}
          >
            <button>Pendding Orders</button>
          </div>
          <div
            id={active === "inprogress" ? "filter_btn_active" : "filter_btn"}
            onClick={() => handleStatusFilter("inprogress", "inprogress")}
          >
            <button>Inprogress Orders</button>
          </div>
        </div>
      )}
    </div>
  );
};

// user data sortere here
export const TableUserFilter = ({ dependency }) => {
  const { handleSearchFiltering, handleUserFilter, handleResetFilter, active } =
    dependency;

  return (
    <div id="table_sorter_wrapper">
      <div id="sorter_input_wrapper">
        <input
          className="sorting_input"
          placeholder="filter title..."
          onChange={handleSearchFiltering}
        />
      </div>

      <div id="table_data_filter_wrapper">
        <div
          id={active === "reset" ? "filter_btn_active" : "filter_btn"}
          onClick={() => handleResetFilter("reset")}
        >
          <button>All Users</button>
        </div>
        <div
          id={active === "customer" ? "filter_btn_active" : "filter_btn"}
          onClick={() => handleUserFilter(false, "customer")}
        >
          <button>Customers</button>
        </div>
        <div
          id={active === "admin" ? "filter_btn_active" : "filter_btn"}
          onClick={() => handleUserFilter(true, "admin")}
        >
          <button>Admins</button>
        </div>
        <div
          id={active === "moderator" ? "filter_btn_active" : "filter_btn"}
          onClick={() => handleUserFilter("moderator", "moderator")}
        >
          <button>Moderators</button>
        </div>
        <div
          id={active === "vendor" ? "filter_btn_active" : "filter_btn"}
          onClick={() => handleUserFilter("vendor", "vendor")}
        >
          <button>Vendor</button>
        </div>
      </div>
    </div>
  );
};

export const TableDataSorterInput = ({ dependency }) => {
  const { setPageSize, pageSize } = dependency;

  return (
    <div id="table_sorter_wrapper">
      <div id="sorter_input_wrapper">
        Show
        <select
          className="sorting_input"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        entries
      </div>
    </div>
  );
};
