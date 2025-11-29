import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@uidotdev/usehooks";

import {
  fetchProducts,
  searchProductsThunk,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "@/features/products/productsThunks";

import ProductsTable from "./ProductsTable";
import AddProductModal from "./AddProductModal";
import ViewProductModal from "./ViewProductModal";
import UpdateProductModal from "./UpdateProductModal";
import DeleteProductModal from "./DeleteProductModal";
import ProductsSearch from "./ProductsSearch";

import CardHeader from "@/components/CardHeader";
import Pagination from "@/components/Pagination";
import { Offcanvas } from "@/components/Offcanvas";

const ProductsPage = () => {
  const isDesktopDevice = useMediaQuery("(min-width: 640px)");
  const dispatch = useDispatch();
  const { products, meta } = useSelector((state) => state.products);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("products_page");
    return savedPage ? Number(savedPage) : 1;
  });

  useEffect(() => {
    localStorage.setItem("products_page", page);
  }, [page]);

  const [filters, setFilters] = useState({ name: "", categoryId: "" });
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isSearching) {
      dispatch(
        searchProductsThunk({
          search: filters.name,
          categoryId: filters.categoryId,
          page,
        })
      );
    } else {
      dispatch(fetchProducts({ page }));
    }
  }, [page, dispatch, isSearching]);

  const closeModal = () => {
    setSelectedProduct(null);
    setIsAddOpen(false);
    setIsViewOpen(false);
    setIsUpdateOpen(false);
    setIsDeleteOpen(false);
  };

  const handleAddProduct = (data) => {
    setLoading(true);
    dispatch(createProductThunk(data))
      .unwrap()
      .then(() => {
        setIsAddOpen(false);
        dispatch(fetchProducts({ page }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateProduct = (data) => {
    setLoading(true);
    dispatch(updateProductThunk({ id: selectedProduct.id, data }))
      .unwrap()
      .then(() => {
        setIsUpdateOpen(false);
        dispatch(fetchProducts({ page }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteProduct = () => {
    setLoading(true);
    dispatch(deleteProductThunk(selectedProduct.id))
      .unwrap()
      .then(() => {
        setIsDeleteOpen(false);
        dispatch(fetchProducts({ page }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = () => {
    if (open) setOpen(false);
    if (!filters.name && !filters.categoryId) return;

    setIsSearching(true);
    setPage(1);
    dispatch(
      searchProductsThunk({
        search: filters.name,
        categoryId: filters.categoryId,
        page: 1,
      })
    );
  };

  const handleCancelSearch = () => {
    setFilters({ name: "", categoryId: "" });

    if (open) setOpen(false);
    if (!isSearching) return;
    setIsSearching(false);
    setPage(1);
    dispatch(fetchProducts({ page: 1 }));
  };

  return (
    <div className="flex w-full h-full flex-col gap-y-2 p-4">
      {/* Search Section */}
      {isDesktopDevice ? (
        <ProductsSearch
          filters={filters}
          setFilters={setFilters}
          search={handleSearch}
          cancel={handleCancelSearch}
        />
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-[#5EB756] text-white text-sm px-3 py-2 rounded-md shadow-sm sm:hidden"
        >
          بحث المنتجات
        </button>
      )}

      <div className="card">
        <CardHeader
          title={"المنتجات"}
          buttonTitle={"منتج"}
          handleClick={() => setIsAddOpen(true)}
        />
        <div className="card-body">
          <ProductsTable
            products={products}
            onView={(product) => {
              setSelectedProduct(product);
              setIsViewOpen(true);
            }}
            onEdit={(product) => {
              if (!product) return;
              setSelectedProduct(product);
              setIsUpdateOpen(true);
            }}
            onDelete={(product) => {
              setSelectedProduct(product);
              setIsDeleteOpen(true);
            }}
          />
        </div>
      </div>

      {/* pagination */}
      <Pagination
        page={meta.page}
        totalPages={meta.totalPage}
        totalUsers={meta.total}
        limit={meta.limit}
        onPageChange={setPage}
      />

      {isAddOpen && (
        <AddProductModal onConfirm={handleAddProduct} onClose={closeModal} loading={loading} />
      )}

      {isViewOpen && <ViewProductModal product={selectedProduct} onClose={closeModal} />}

      {isUpdateOpen && (
        <UpdateProductModal
          product={selectedProduct}
          onConfirm={handleUpdateProduct}
          onClose={closeModal}
          loading={loading}
        />
      )}

      {isDeleteOpen && (
        <DeleteProductModal
          product={selectedProduct}
          onConfirm={handleDeleteProduct}
          onClose={closeModal}
          loading={loading}
        />
      )}

      {open && (
        <Offcanvas title="بيانات المنتج" onClose={() => setOpen(false)}>
          <ProductsSearch
            filters={filters}
            setFilters={setFilters}
            search={handleSearch}
            cancel={handleCancelSearch}
          />
        </Offcanvas>
      )}
    </div>
  );
};

export default ProductsPage;
