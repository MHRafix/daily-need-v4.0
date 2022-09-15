import { useState } from "react";

export default function useModalFilter(modalData, setFilterData) {
  const [active, setActive] = useState("reset");

  const [show, setShow] = useState(false);

  // handle add item form show
  const handleAddFormShow = () => {
    setShow(() => (show ? false : true));
  };

  // handle search filtering
  const handleSearchFilter = (e) => {
    const search_res = modalData.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterData(search_res);
  };

  // handle status filter function here
  const handleStatusFilter = (status, activer) => {
    const filtered_products = modalData?.filter(
      (product) => product.product_status === status
    );
    setActive(activer);
    setFilterData(filtered_products);
  };

  // handle type filter function here
  const handleTypeFilter = (type, activer) => {
    const filtered_products = modalData?.filter(
      (product) => product.product_type === type
    );
    setActive(activer);
    setFilterData(filtered_products);
  };

  // reset filter
  const handleResetFilter = (activer) => {
    setActive(activer);
    setFilterData(modalData);
  };

  // sorting dependency
  const sorting_dependency = {
    handleSearchFilter,
    handleStatusFilter,
    handleTypeFilter,
    handleResetFilter,
    active,
  };

  return {
    show,
    sorting_dependency,
    handleAddFormShow,
  };
}
