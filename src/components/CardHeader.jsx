import PlusIcon from "@/assets/icons/plus.svg";

const CardHeader = ({ title = "", button = true, buttonTitle = "", handleClick = () => {} }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="font-medium text-xs text-black py-2">قائمة {title}</p>
      {button && (
        <button
          className="bg-[#5EB756] flex justify-center items-center gap-x-1 rounded-lg p-2"
          onClick={handleClick}
        >
          <span className="text-white text-[10px]">إضافة {buttonTitle}</span>
          <img src={PlusIcon} alt="plus-icon" className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default CardHeader;
