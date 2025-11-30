import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@uidotdev/usehooks";

import {
  fetchCategories,
  searchCategoriesThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from "@/features/categories/categoriesThunks";

import CategoriesTable from "./CategoriesTable";
import AddCategoryModal from "./AddCategoryModal";
import ViewCategoryModal from "./ViewCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import CategoriesSearch from "./CategoriesSearch";

import CardHeader from "@/components/CardHeader";
import Pagination from "@/components/Pagination";
import { Offcanvas } from "@/components/Offcanvas";

import FilterIcon from "@/assets/icons/filter-icon.svg";

const CategoriesPage = () => {
  const isDesktopDevice = useMediaQuery("(min-width: 480px)");
  const dispatch = useDispatch();
  const { categories, meta } = useSelector((state) => state.categories);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("categories_page");
    return savedPage ? Number(savedPage) : 1;
  });

  useEffect(() => {
    localStorage.setItem("categories_page", page);
  }, [page]);

  const [filters, setFilters] = useState({ name: "" });
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isSearching) {
      dispatch(
        searchCategoriesThunk({
          search: filters.name,
          page,
        })
      );
    } else {
      dispatch(fetchCategories({ page }));
    }
  }, [page, dispatch, isSearching]);

  const closeModal = () => {
    setSelectedCategory(null);
    setIsAddOpen(false);
    setIsViewOpen(false);
    setIsUpdateOpen(false);
    setIsDeleteOpen(false);
  };

  const handleAddCategory = (data) => {
    setLoading(true);
    dispatch(createCategoryThunk(data))
      .unwrap()
      .then(() => {
        setIsAddOpen(false);
        dispatch(fetchCategories({ page }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateCategory = (data) => {
    setLoading(true);
    dispatch(updateCategoryThunk({ id: selectedCategory.id, data }))
      .unwrap()
      .then(() => {
        setIsUpdateOpen(false);
        dispatch(fetchCategories({ page }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteCategory = () => {
    setLoading(true);
    dispatch(deleteCategoryThunk(selectedCategory.id))
      .unwrap()
      .then(() => {
        setIsDeleteOpen(false);
        dispatch(fetchCategories({ page }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = () => {
    if (open) setOpen(false);
    if (!filters.name) return;

    setIsSearching(true);
    setPage(1);
    dispatch(
      searchCategoriesThunk({
        search: filters.name,
        page: 1,
      })
    );
  };

  const handleCancelSearch = () => {
    setFilters({ name: "" });

    if (open) setOpen(false);
    if (!isSearching) return;
    setIsSearching(false);
    setPage(1);
    dispatch(fetchCategories({ page: 1 }));
  };

  return (
    <div className="flex w-full h-full flex-col gap-y-2 p-4">
      {/* Search Section */}
      {isDesktopDevice ? (
        <CategoriesSearch
          filters={filters}
          setFilters={setFilters}
          search={handleSearch}
          cancel={handleCancelSearch}
        />
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-x-2 text-[#5EB756] text-xs py-1 sm:hidden"
        >
          <img src={FilterIcon} alt="filter-icon" className="w-4 h-4" />تصفية
        </button>
      )}

      <div className="card">
        <CardHeader
          title={"التصنيفات"}
          buttonTitle={"تصنيف"}
          handleClick={() => setIsAddOpen(true)}
        />
        <div className="card-body">
          <CategoriesTable
            categories={categories}
            onView={(category) => {
              setSelectedCategory(category);
              setIsViewOpen(true);
            }}
            onEdit={(category) => {
              if (!category) return;
              setSelectedCategory(category);
              setIsUpdateOpen(true);
            }}
            onDelete={(category) => {
              setSelectedCategory(category);
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
        <AddCategoryModal onConfirm={handleAddCategory} onClose={closeModal} loading={loading} />
      )}

      {isViewOpen && <ViewCategoryModal category={selectedCategory} onClose={closeModal} />}

      {isUpdateOpen && (
        <UpdateCategoryModal
          category={selectedCategory}
          onConfirm={handleUpdateCategory}
          onClose={closeModal}
          loading={loading}
        />
      )}

      {isDeleteOpen && (
        <DeleteCategoryModal
          category={selectedCategory}
          onConfirm={handleDeleteCategory}
          onClose={closeModal}
          loading={loading}
        />
      )}

      {open && (
        <Offcanvas title="بحث التصنيفات" onClose={() => setOpen(false)}>
          <CategoriesSearch
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

export default CategoriesPage;
