import React, { useEffect, useState } from "react";
import { getPhimMoi } from "../../api/Api";
import Movie from "./Movie";

function ListMovie() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pageCount = 2; // số trang muốn lấy
                const promises = [];

                for (let page = 1; page <= pageCount; page++) {
                    promises.push(getPhimMoi(page));
                }

                const results = await Promise.all(promises);
                const allFilms = results.flat();

                allFilms.sort((a, b) => new Date(b.created) - new Date(a.created));
                setFilms(allFilms);
                setLoading(false); // xong thì tắt loading
                setError(false);
            } catch (error) {
                console.error("Lỗi khi load phim:", error);
                setError(true);
                setTimeout(fetchData, 1000); // 2s sau tự load lại
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#0d1b2a] text-yellow-400 text-xl z-[9999]">
                <div className="animate-pulse">Đang tải phim...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#0d1b2a] text-red-500 text-xl z-[9999] ">
                <div className="animate-pulse">Không tìm thấy phim! Vui lòng reloading.</div>
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-6xl mx-auto mb-10 px-6">
                <div className="flex flex-wrap -m-2">
                    {films.map((p) => (
                        <Movie key={p.slug} movie={p} className="xs:w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/4" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListMovie;
