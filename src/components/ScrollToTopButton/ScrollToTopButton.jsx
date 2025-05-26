import React, { useState } from 'react';
import { AiOutlineArrowUp } from "react-icons/ai";

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Hàm để kiểm tra khi nào cuộn xuống để hiển thị nút
    const checkScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true); // Hiển thị nút khi cuộn xuống dưới 300px
        } else {
            setIsVisible(false); // Ẩn nút khi ở trên đầu trang
        }
    };

    // Hàm cuộn lên đầu trang
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Cuộn mượt mà
        });
    };

    // Lắng nghe sự kiện scroll trên window
    React.useEffect(() => {
        window.addEventListener('scroll', checkScroll);

        // Cleanup để loại bỏ event listener khi component unmount
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <div>
            <button
                className={`text-[25px] font-bold fixed bottom-3 right-4 bg-yellow-400 text-black p-3 rounded-lg transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                onClick={scrollToTop}
                style={{ transition: 'opacity 0.3s ease' }}
            >
                <AiOutlineArrowUp />
            </button>
        </div>
    );
}

export default ScrollToTopButton;
