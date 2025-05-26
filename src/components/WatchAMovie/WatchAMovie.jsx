import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetail, getPhimMoi } from "../../api/Api";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import SliderMovies from "../SliderMovies/SliderMovies";

export default function WatchAMovie() {
    const { slug, serverIndex, episodeIndex } = useParams();
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [server, setServer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(Number(episodeIndex));
    const [movie, setMovie] = useState(null);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMovieDetail(slug);
            const server = data.episodes[serverIndex];
            const episode = server?.items?.[episodeIndex];
            setMovie(data); // lưu tên phim
            setSelectedEpisode(episode?.embed || null);
            setServer(server);
            setCurrentIndex(Number(episodeIndex));
            setLoading(false);
        };

        fetchData();
    }, [slug, serverIndex, episodeIndex]);

    useEffect(() => {
        const fetchFilms = async () => {
            const data = await getPhimMoi(1);
            setFilms(data);
        };
        fetchFilms();
    }, []);

    if (loading) {
        return <div className="text-yellow-400 text-center py-10">Đang tải...</div>;
    }

    return (
        <div className="mt-16 pt-6">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-yellow-400 text-xl font-semibold mb-4 flex ">
                    <Link to={`/phim/${movie.slug}`}>
                        {movie?.name}
                    </Link>

                    <span className="mx-3">/</span> <span className="text-white">Tập {server?.items?.[episodeIndex]?.name}</span>
                </div>
                <WatchPlayer
                    selectedEpisode={selectedEpisode}
                    setSelectedEpisode={setSelectedEpisode}
                    server={server}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />
                <Comments />
                <SliderMovies films={films} />
            </div>
        </div>
    );

}

function WatchPlayer({ selectedEpisode, setSelectedEpisode, server, currentIndex, setCurrentIndex }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    }, [selectedEpisode]);

    return (
        <div>
            < div className="mb-6 aspect-video w-full relative bg-[#263946]" >
                {!selectedEpisode ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-yellow-400 rounded">
                        Vui lòng chọn một tập để xem
                    </div>
                ) : (
                    <>
                        {loading && (
                            <div className="fixed inset-0 flex items-center justify-center bg-[#0d1b2a] text-yellow-400 text-xl z-[9999]">
                                <div className="animate-pulse">Đang tải video...</div>
                            </div>
                        )}
                        <div className="aspect-video w-full">
                            <iframe
                                src={selectedEpisode}
                                title="Episode Player"
                                allowFullScreen
                                className="w-full h-full rounded z-0"
                                onLoad={() => setLoading(false)}
                            />
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-10 gap-2 max-h-[150px] overflow-y-auto">
                                {server.items.map((episode, i) => {
                                    const isActive = i === currentIndex;
                                    return (
                                        <button
                                            key={i}
                                            className={`py-2 px-3 rounded text-sm focus:outline-none
                                        ${isActive
                                                    ? "bg-yellow-400 text-black"
                                                    : "bg-[#4f4f4f] text-white hover:bg-[#e87d7f] hover:text-black"
                                                }`}
                                            onClick={() => {
                                                setSelectedEpisode(episode.embed);
                                                setCurrentIndex(i);
                                            }}
                                        >
                                            {episode.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )
                }
            </div >
        </div >
    );
}
