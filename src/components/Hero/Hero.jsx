import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { getPhimMoi } from "../../api/Api";

function Hero() {
    const [movies, setMovies] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            const promises = [];

            for (let page = 1; page <= 10; page++) {
                promises.push(getPhimMoi(page));
            }

            try {
                const results = await Promise.all(promises);
                const allMovies = results.flat(); // gom tất cả phim lại

                const preloadPromises = allMovies.map(movie => {
                    if (movie.poster_url) {
                        return new Promise((resolve) => {
                            const img = new Image();
                            img.src = movie.poster_url;
                            img.onload = () => {
                                if (img.width >= 1000) {
                                    resolve(movie);
                                } else {
                                    resolve(null);
                                }
                            };
                            img.onerror = () => resolve(null);
                        });
                    }
                    return Promise.resolve(null);
                });

                const loadedMovies = await Promise.all(preloadPromises);
                const filteredMovies = loadedMovies.filter(movie => movie !== null).slice(0, 10); // lấy 10 phim đầu tiên

                setMovies(filteredMovies);
            } catch (err) {
                console.error("Error loading movies:", err);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        if (movies.length > 0) {
            const intervalId = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % movies.length);
            }, 5000);
            return () => clearInterval(intervalId);
        }
    }, [movies]);

    if (movies.length === 0) {
        return <div>Loading...</div>;
    }

    const currentMovie = movies[index];

    return (
        <div><div
            className="relative w-full h-[400px] md:h-[600px] bg-cover bg-center"
            style={{
                backgroundImage: `url(${window.innerWidth < 400 ? currentMovie.thumb_url : currentMovie.poster_url})`
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-[#112638] via-[#112638]/30 to-transparent"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col justify-end h-full text-white">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 truncate 2xl:h-[60px]">
                    {currentMovie.name}
                </h1>

                <p className="text-lg sm:text-xl text-yellow-400 mb-3">{currentMovie.origin_name}</p>

                <div className="flex items-center flex-wrap gap-2 mb-4">
                    <span className="bg-yellow-500 text-black text-xs sm:text-sm px-2 py-1 rounded">
                        {currentMovie.current_episode?.includes('Hoàn tất')
                            ? currentMovie.current_episode
                            : currentMovie.current_episode === 'FULL'
                                ? 'FULL'
                                : currentMovie.current_episode === currentMovie.total_episodes
                                    ? currentMovie.current_episode
                                    : `${currentMovie.current_episode}/${currentMovie.total_episodes}`}
                    </span>
                </div>

                <div className="h-[70px] mb-5">
                    <p className="max-w-2xl text-justify text-sm sm:text-base overflow-hidden line-clamp-3">
                        {currentMovie.description}
                    </p>
                </div>
                <Link to={`/phim/${currentMovie.slug}`}>
                    <div className="flex items-center gap-4">
                        <button className="bg-yellow-400 2xl:p-4 xs:p-3 rounded-full hover:scale-105 transition">
                            <FaPlay className="text-black" />
                        </button>
                        <p className="text-lg sm:text-xl text-yellow-400 hover:scale-105 transition">Xem Ngay</p>
                    </div>
                </Link>


                <p className="text-yellow-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-5 2xl:mt-14 xs:mt-5">
                    PHIM MỚI CẬP NHẬT
                </p>
            </div>
        </div>
        </div>
    );
}

export default Hero;
