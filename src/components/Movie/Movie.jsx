import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

export default function Movie({ movie, className = '' }) {
    return (
        <div className={`w-full p-2 ${className}`}>
            <div className="relative overflow-hidden rounded-lg shadow-md bg-[#1e293b] group"> {/* THÊM group ở đây */}
                <Link to={`/phim/${movie.slug}`} className="block relative">
                    <img
                        src={movie.thumb_url}
                        alt={movie.name}
                        className="w-full xs:h-[280px] sm:h-[280px] md:h-[250px] 2xl:h-[350px] object-cover transition-transform duration-300 "
                    />

                    {/* Overlay Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-white">
                            <FaPlay className="text-white" />
                        </div>
                    </div>
                </Link>

                {/* Language badge */}
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs sm:text-sm px-2 py-1 rounded-lg">
                    {movie.language}
                </div>

                {/* Episode badge */}
                <div className="absolute bottom-0 right-0 bg-yellow-400 text-gray-800 text-xs sm:text-sm px-2 py-1 rounded-lg">
                    {movie.current_episode.includes('Hoàn tất')
                        ? movie.current_episode
                        : movie.current_episode === 'FULL'
                            ? 'FULL'
                            : movie.current_episode === movie.total_episodes
                                ? movie.current_episode
                                : `${movie.current_episode}/${movie.total_episodes}`}
                </div>
            </div>

            {/* Tên phim */}
            <Link to={`/phim/${movie.slug}`}>
                <div className="text-white text-sm sm:text-base md:text-lg font-semibold py-2 truncate hover:text-yellow-400 transition">
                    {movie.name}
                </div>
            </Link>
        </div>

    );
}
