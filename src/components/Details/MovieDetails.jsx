import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail, getPhimMoi } from "../../api/Api";
import { FaImages, FaVideo, FaUser, FaCaretDown, FaMicrophone } from "react-icons/fa";
import { MdVideoLibrary, MdDescription } from "react-icons/md";
import Comments from "../Comments/Comments";
import SliderMovies from "../SliderMovies/SliderMovies";
function MovieDetail() {
    const { slug } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeTab, setActiveTab] = useState("episode");
    const [selectedEpisode, setSelectedEpisode] = useState(null); // Thêm state để lưu embed
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMovieDetail(slug);
                if (data) {
                    setMovie(data);
                    // Tự động chọn tập đầu tiên nếu có
                    if (data.episodes?.[0]?.items?.[0]?.embed) {
                        setSelectedEpisode(data.episodes[0].items[0].embed);
                    }
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Lỗi khi load chi tiết phim:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    useEffect(() => {
        const fetchFilms = async () => {
            const data = await getPhimMoi(1);
            setFilms(data);
        };
        fetchFilms();
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#0d1b2a] text-yellow-400 text-xl z-[9999]">
                <div className="animate-pulse">Đang tải phim...</div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#0d1b2a] text-red-500 text-xl z-[9999] ">
                <div className="animate-pulse">Không tìm thấy phim! Vui lòng reloading.</div>
            </div>
        );
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case "episode":
                return (
                    <div className="p-6">
                        {movie.episodes?.map((server, index) => (
                            <div key={index} className="mb-6">
                                <h4 className="flex items-center text-lg font-semibold mb-2">
                                    <FaMicrophone className="mr-1" />
                                    {server.server_name.toUpperCase()}
                                </h4>
                                <div className="grid grid-cols-10 gap-2 max-h-[150px] overflow-y-auto pr-4">
                                    {[...server.items].reverse().map((episode, i) => (
                                        <button
                                            key={i}
                                            className="bg-[#4f4f4f] hover:bg-[#e87d7f] hover:text-black text-white py-2 px-3 rounded text-sm focus:outline-none"
                                            onClick={() => {
                                                window.location.href = `/xem-phim/${slug}/${index}/${server.items.length - 1 - i}`;

                                            }}

                                        >
                                            {episode.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case "info":
                return (
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Thông tin phim</h3>
                        <p className="text-md mb-4 text-justify">{movie.description}</p>
                    </div>
                );
            case "cast":
                return (
                    <div className="p-6">
                        <div className="flex flex-wrap gap-6">
                            {movie.casts ? (
                                movie.casts.split(',').map((actor, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div className="bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center">
                                            <FaUser className="text-3xl" />
                                        </div>
                                        <p className="text-white text-lg mt-2 text-center">{actor.trim()}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center">
                                        <FaUser className="text-3xl" />
                                    </div>
                                    <p className="text-white text-lg mt-2 text-center">Actor is being updated</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case "trailer":
                return (
                    <div className="p-6">
                        <p>Trailer đang được cập nhật...</p>
                    </div>
                );
            case "images":
                return (
                    <div className="flex justify-center p-6">
                        <img
                            src={movie.poster_url}
                            alt={movie.name}
                            className="rounded-md"
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="px-2">
            <div className="text-white max-w-6xl mx-auto mt-16 pb-10 px-2 sm:px-6 pt-6">
                <div
                    className="relative w-full h-auto bg-cover bg-center flex flex-col sm:flex-row items-start p-2 sm:p-6 rounded-md"
                    style={{ backgroundImage: `url(${movie.poster_url})` }}
                >
                    <div className="absolute inset-0 bg-black/60 rounded-md"></div>

                    <div className="relative w-full md:w-1/3 mb-4 md:mb-0 md:mr-6">
                        <img
                            src={movie.thumb_url}
                            alt={movie.name}
                            className="w-full h-auto object-cover rounded-md"
                        />
                        <button
                            className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded"
                            onClick={() => {
                                if (movie.episodes?.[0]?.items?.[0]) {
                                    window.location.href = `/xem-phim/${slug}/0/0`;
                                }
                            }}
                        >
                            XEM PHIM
                        </button>

                    </div>

                    <div className="relative z-10 w-full md:w-2/3">
                        <h2 className="text-2xl font-bold mb-2 text-yellow-400">{movie.name}</h2>
                        <h3 className="text-lg mb-4">{movie.original_name}</h3>
                        <p className="text-md mb-5 text-justify max-h-[150px] overflow-y-auto pr-4">
                            {movie.description}
                        </p>

                        <div className="border-b-[1px] mb-5"></div>

                        <div className="flex items-center text-md mb-4">
                            <span className="mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {movie.time}
                            </span>
                            <span className="mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(movie.created).toLocaleString("vi-VN", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                    timeZone: "Asia/Ho_Chi_Minh"
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-start border-t border-gray-800 px-5 text-gray-300 bg-black">
                    <TabButton label="Tập Phim" icon={<MdVideoLibrary />} active={activeTab === "episode"} onClick={() => setActiveTab("episode")} />
                    <TabButton label="Thông tin phim" icon={<MdDescription />} active={activeTab === "info"} onClick={() => setActiveTab("info")} />
                    <TabButton label="Diễn viên" icon={<FaUser />} active={activeTab === "cast"} onClick={() => setActiveTab("cast")} />
                    <TabButton label="Trailer" icon={<FaVideo />} active={activeTab === "trailer"} onClick={() => setActiveTab("trailer")} />
                    <TabButton label="Hình ảnh" icon={<FaImages />} active={activeTab === "images"} onClick={() => setActiveTab("images")} />
                </div>

                <div className="bg-[#263946]">
                    {renderTabContent()}
                </div>

                <Comments />

                <SliderMovies films={films} />

            </div>
        </div>
    );
}

function TabButton({ label, icon, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className="relative group px-4 text-white focus:outline-none"
        >
            {active && (
                <div className="absolute -bottom-[10px] left-1/2 transform -translate-x-1/2 text-yellow-400 text-[18px]">
                    <FaCaretDown />
                </div>
            )}
            <div className={`flex items-center border-b-[3px] py-4 transition-colors duration-200 ${active ? "text-yellow-400 border-yellow-400 font-semibold" : "border-transparent"}`}>
                <span className="mr-2">{icon}</span>
                <span className="hidden sm:inline">{label}</span>
            </div>
        </button>
    );
}

export default MovieDetail;
