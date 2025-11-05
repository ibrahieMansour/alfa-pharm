import React from "react";
import { cn } from "../utils/cn";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useSelector } from "react-redux";
const Pagination = ({ page, totalPages, totalUsers, limit, onPageChange }) => {
  const isDesktopDevice = useMediaQuery("(min-width: 575px)");
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const showLeftEllipsis = page > 4;
    const showRightEllipsis = page < totalPages - 3;

    if (!showLeftEllipsis && showRightEllipsis) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    } else if (showLeftEllipsis && !showRightEllipsis) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else if (showLeftEllipsis && showRightEllipsis) {
      return [1, "...", page - 1, page, page + 1, "...", totalPages];
    }

    return [];
  };

  const pages = getPageNumbers();

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalUsers);

  return isDesktopDevice ? (
    <div className="flex justify-between items-center flex-wrap border-t gap-x-3">
      <div>
        <p className="text-[10px] text-[#1D242E] font-bold">
          اظهار {start}–{end} من اصل {totalUsers}
        </p>
      </div>
      <div className="flex gap-x-1 py-0.5 px-1 flex-wrap justify-center items-center bg-white rounded-lg">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={i}
              className={cn(
                "text-[10px] font-bold w-6 h-6 rounded-full hover:bg-[#F4EBD0]",
                p === page && "bg-[#F4EBD0]"
              )}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )
        )}
      </div>
      <div className="flex items-center gap-x-2">
        <button
          aria-label="الصفحة السابقة"
          className={cn(
            "w-5 h-5 flex justify-center items-center text-xs font-bold bg-white rounded-[4px] border border-[#5EB756] text-[#5EB756]",
            page === 1 && "border-[#1d242e4d] text-[#1d242e4d] cursor-not-allowed"
          )}
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          &lt;
        </button>
        <p className="text-[10px] text-[#1D242E] font-bold">صفحة {page}</p>
        <button
          aria-label="الصفحة التالية"
          className={cn(
            "w-5 h-5 flex justify-center items-center text-xs font-bold bg-white rounded-[4px] border border-[#5EB756] text-[#5EB756]",
            page === totalPages && "border-[#1d242e4d] text-[#1d242e4d] cursor-not-allowed"
          )}
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-between items-center">
      <button
        className={cn(
          "text-2xl font-black text-[#5EB756]",
          page === 1 && "text-[#1d242e4d] cursor-not-allowed"
        )}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        &#8594;
      </button>
      <p className="text-[10px] text-[#1D242E] font-bold">
        صفحة {page}-{totalPages}
      </p>
      <button
        className={cn(
          "text-2xl font-black text-[#5EB756]",
          page === totalPages && "text-[#1d242e4d] cursor-not-allowed"
        )}
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        &#8592;
      </button>
    </div>
  );
};

export default Pagination;
