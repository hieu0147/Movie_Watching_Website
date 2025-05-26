import React from 'react';
import logo from '../../image/logo/logo192.png';

function Footer() {
    return (
        <footer className="bg-black text-white py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
                <div>
                    <div className="flex items-center mb-3">
                        <img src={logo} alt="Logo" className="h-8" />
                        <p className="text-[25px] ml-1 font-bold">Movies</p>
                    </div>
                    <p className="text-sm text-justify ">Movies trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD.
                        Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại.
                        Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!</p>
                </div>
                <div>
                    <h4 className="font-bold mb-4 h-8 text-[25px]">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 h-8 text-[25px]">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Community</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 h-8 text-[25px]">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Security</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
