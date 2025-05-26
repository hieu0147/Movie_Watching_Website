import React, { useState, useEffect, useRef } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { FaSearch, FaAngleDown } from "react-icons/fa";
import logo from '../../image/logo/logo192.png';
import { Link } from "react-router-dom";

export default function Header() {
    const [scrolling, setScrolling] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();
    const categories = [
        { label: "Hành Động" },
        { label: "Phiêu Lưu" },
        { label: "Hoạt Hình" },
        { label: "Hài" },
        { label: "Hình Sự" },
        { label: "Tài Liệu" },
        { label: "Chính Kịch" },
        { label: "Gia Đình" },
        { label: "Giả Tưởng" },
        { label: "Lịch Sử" },
        { label: "Kinh Dị" },
        { label: "Nhạc" },
        { label: "Bí Ẩn" },
        { label: "Lãng Mạn" },
        { label: "Khoa Học Viễn Tưởng" },
        { label: "Gây Cấn" },
        { label: "Chiến Tranh" },
        { label: "Tâm Lý" },
        { label: "Tình Cảm" },
        { label: "Cổ Trang" },
        { label: "Miền Tây" },
        { label: "Phim 18+" }
    ];

    const countries = [
        { label: "Âu Mỹ" },
        { label: "Anh" },
        { label: "Trung Quốc" },
        { label: "Indonesia" },
        { label: "Việt Nam" },
        { label: "Pháp" },
        { label: "Hồng Kông" },
        { label: "Hàn Quốc" },
        { label: "Nhật Bản" },
        { label: "Thái Lan" },
        { label: "Đài Loan" },
        { label: "Nga" },
        { label: "Hà Lan" },
        { label: "Philippines" },
        { label: "Ấn Độ" },
        { label: "Quốc gia khác" },
    ];


    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Đóng menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <header className={`fixed top-0 w-full z-50 transition-all ${scrolling ? 'bg-[#0D1B2A] border-b border-[#13283B]' : 'bg-transparent'}`}>
            <div className="max-w-6xl container mx-auto flex items-center justify-between py-3 px-4 text-white">
                {/* Logo */}
                <Link to="/" className="flex items-center cursor-pointer">
                    <img src={logo} alt="Logo" className="h-8" />
                    <p className="text-xl ml-2">Movies</p>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
                    <DropdownMenu title="THỂ LOẠI" items={categories} />


                    <DropdownMenu title="QUỐC GIA" items={countries} />

                    <a href="#" className="hover:text-yellow-400">PHIM LẺ</a>
                    <a href="#" className="hover:text-yellow-400">PHIM BỘ</a>
                    <a href="#" className="hover:text-yellow-400">PHIM CHIẾU RẠP</a>
                </nav>

                {/* Search bar desktop */}
                <div className="hidden md:block relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm phim..."
                        className="bg-[rgba(255,255,255,0.08)] text-sm text-white placeholder-white rounded-md pl-10 pr-4 py-2 focus:outline-none"
                    />
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button className="text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div ref={menuRef} className="md:hidden bg-[#0D1B2A] border-t border-[#13283B] px-6 py-4 space-y-4 text-white">
                    {/* Search trong menu mobile */}
                    <div className="relative mb-4">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="Tìm kiếm phim..."
                            className="bg-[rgba(255,255,255,0.08)] text-sm text-white placeholder-white rounded-md pl-10 pr-4 py-2 w-full focus:outline-none"
                        />
                    </div>

                    {/* Các link */}
                    <div className="relative group">
                        <button className="flex items-center space-x-1 hover:text-yellow-400">
                            <span>THỂ LOẠI</span>
                            <FaAngleDown className="ml-1 text-yellow-400" />
                        </button>

                        {/* Dropdown menu */}
                        <div className="absolute left-0 top-full hidden group-hover:grid grid-cols-2 gap-4 bg-[#0D1B2A] text-white text-sm p-4 rounded shadow-lg z-10 min-w-[200px]">
                            <a href="#" className="hover:text-yellow-400">Bí ẩn</a>
                            <a href="#" className="hover:text-yellow-400">Chính kịch</a>
                            <a href="#" className="hover:text-yellow-400">Cổ Trang</a>
                            <a href="#" className="hover:text-yellow-400">Gia Đình</a>
                            <a href="#" className="hover:text-yellow-400">Hài Hước</a>
                            <a href="#" className="hover:text-yellow-400">Hành Động</a>
                            <a href="#" className="hover:text-yellow-400">Học Đường</a>
                            <a href="#" className="hover:text-yellow-400">Khoa Học</a>
                            <a href="#" className="hover:text-yellow-400">Lịch Sử</a>
                            <a href="#" className="hover:text-yellow-400">Kinh Dị</a>
                            <a href="#" className="hover:text-yellow-400">Tâm Lý</a>
                            <a href="#" className="hover:text-yellow-400">Thần Thoại</a>
                            <a href="#" className="hover:text-yellow-400">Tình Cảm</a>
                            <a href="#" className="hover:text-yellow-400">Thể Thao</a>
                            <a href="#" className="hover:text-yellow-400">Thần Thoại</a>
                            <a href="#" className="hover:text-yellow-400">Tài Liệu</a>
                            <a href="#" className="hover:text-yellow-400">Phiêu Lưu</a>
                            <a href="#" className="hover:text-yellow-400">Viễn Tưởng</a>
                            <a href="#" className="hover:text-yellow-400">Võ Thuật</a>
                        </div>
                    </div>
                    <a href="#" className="flex items-center hover:text-yellow-400">QUỐC GIA <FaAngleDown className="ml-1 text-yellow-400" /></a>
                    <a href="#" className="flex items-center hover:text-yellow-400">PHIM LẺ</a>
                    <a href="#" className="flex items-center hover:text-yellow-400">PHIM BỘ</a>
                    <a href="#" className="flex items-center hover:text-yellow-400">PHIM CHIẾU RẠP</a>
                </div>
            )}
        </header>
    );
}
