// import { format } from 'date-fns';
import Image from "next/image";
import Admin from "../../images/users/admin.png";
import Customer from "../../images/users/customer.png";
import Action from "../Action";

// mini users table header column
export const MINI_USER_TABLE_COLUMNS = [
  {
    Header: "User pic",
    accessor: "user_pic",
    // Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyy')}
  },
  {
    Header: "User Name",
    accessor: "user_name",
  },
  {
    Header: "User Email",
    accessor: "user_email",
  },
];

// products table header column
export const PRODUCTS_TABLE_COLUMNS = [
  {
    Header: "Product",
    accessor: "title",
  },
  {
    Header: "Image",
    accessor: "thumbnail",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Reg Price",
    accessor: "prices.regular_price",
  },
  {
    Header: "Sale Price",
    accessor: "prices.sale_price",
  },
  {
    Header: "Available",
    accessor: "stock_available",
  },
  {
    Header: "Status",
    accessor: "product_status",
  },

  {
    Header: "Type",
    accessor: "product_type",
  },
  {
    Header: "Action",
    accessor: "_id",
  },
];

// ordered products table columns
export const ORDERED_PRODUCT_TABLE_COLUMNS = [
  {
    Header: "Product",
    accessor: "title",
  },
  {
    Header: "Image",
    accessor: "thumbnail",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Reg Price",
    accessor: "prices.regular_price",
  },
  {
    Header: "Sale Price",
    accessor: "prices.sale_price",
  },
  {
    Header: "Available",
    accessor: "stock_available",
  },
  {
    Header: "Status",
    accessor: "product_status",
  },

  {
    Header: "Type",
    accessor: "product_type",
  },
];

// orders table column header
export const ORDERS_TABLE_COLUMN = [
  { Header: "CM Name", accessor: "customer_info.customer_name" },
  { Header: "CM Mobile", accessor: "customer_info.customer_mobile" },
  {
    Header: "Order Date",
    accessor: "updatedAt",
  },
  { Header: "Total Amount", accessor: "order_overview.total_amount" },
  { Header: "Payment Mode", accessor: "payment_info.payment_method" },
  { Header: "Status", accessor: "order_overview.order_status" },
  { Header: "Action", accessor: "_id" },
];

// shipped orders and history orders table column here
export const SHIPPED_ORDERS_TABLE_COLUMN = [
  { Header: "CM Name", accessor: "customer_info.customer_name" },
  { Header: "CM Mobile", accessor: "customer_info.customer_mobile" },
  {
    Header: "Order Date",
    accessor: "updatedAt",
  },
  { Header: "Total Amount", accessor: "order_overview.total_amount" },
  { Header: "Payment Mode", accessor: "payment_info.payment_method" },
  { Header: "Status", accessor: "order_overview.order_status" },
  { Header: "Action", accessor: "_id" },
];

// ordered products table header column
export const ORDERED_PRODUCTS_TABLE_COLUMNS = [
  {
    Header: "Product",
    accessor: "title",
  },
  {
    Header: "Image",
    accessor: "thumbnail",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Reg Price",
    accessor: "prices.regular_price",
  },
  {
    Header: "Sale Price",
    accessor: "prices.sale_price",
  },
  {
    Header: "Type",
    accessor: "product_type",
  },
];

// category products table header column
export const CATEGORY_PRODUCTS_TABLE_COLUMNS = [
  {
    Header: "Category Name",
    accessor: "cat_name",
  },
  {
    Header: "Category Image",
    accessor: "cat_image",
  },
  {
    Header: "Products Quantity",
    accessor: "category",
  },
  {
    Header: "Action",
    accessor: "cat_name2",
  },
];

// all users table column here
export const ALL_USERS_TABLE_COLUMNS = [
  {
    Header: "User Name",
    accessor: "user_name",
  },
  {
    Header: "User Photo",
    accessor: "user_pic",
  },
  {
    Header: "User Email",
    accessor: "user_email",
  },
  {
    Header: "User Role",
    accessor: "user_admin",
  },
  {
    Header: "Action",
    accessor: "_id",
  },
];

// limited products table header column
export const LIMITED_PRODUCTS_TABLE_COLUMNS = [
  {
    Header: "Product",
    accessor: "title",
  },
  {
    Header: "Image",
    accessor: "thumbnail",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Rest Time",
    accessor: "offer_end",
  },
  {
    Header: "Sale Price",
    accessor: "prices.sale_price",
  },
  {
    Header: "Available",
    accessor: "stock_available",
  },
  {
    Header: "Status",
    accessor: "product_status",
  },

  {
    Header: "Type",
    accessor: "product_type",
  },
  {
    Header: "Action",
    accessor: "_id",
  },
];
