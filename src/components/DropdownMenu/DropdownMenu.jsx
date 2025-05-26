import { FaAngleDown, FaCaretUp } from "react-icons/fa";

const DropdownMenu = ({ title, items }) => {
    return (
        <div className="relative group">
            {/* Button chính */}
            <button className="flex items-center space-x-1 hover:text-yellow-400">
                <span>{title}</span>
                <FaAngleDown className="ml-1 text-yellow-400" />
            </button>

            {/* Dropdown menu */}
            <div
                className={`absolute left-0 top-full mt-3 hidden group-hover:grid grid-cols-3 gap-4 bg-[#112638]/90 text-white text-sm p-6 rounded-md shadow-lg z-10 min-w-[500px] border-t-4 border-yellow-400`}
            >
                {/* Icon mũi tên */}
                <div className="absolute -top-4 left-6 text-yellow-400 text-xl">
                    <FaCaretUp />
                </div>

                {/* Các item link */}
                {items.map((item, index) => (
                    <a key={index} href={item.href || "#"} className="hover:text-yellow-400">
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default DropdownMenu;
