import axios from "axios";

export async function getPhimMoi(page) {
    try {
        const response = await axios.get(`https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=${page}`);
        const items = response.data.items;

        const simplifiedFilms = items.map((film) => ({
            name: film.name,
            slug: film.slug,
            thumb_url: film.thumb_url,
            poster_url: film.poster_url,
            created: film.created,
            modified: film.modified,
            total_episodes: film.total_episodes,
            current_episode: film.current_episode,
            language: film.language,
            description: film.description,
        }));

        return simplifiedFilms;
    } catch (error) {
        console.error("Lỗi khi lấy phim:", error);
        return [];
    }
}

export async function getMovieDetail(slug) {
    try {
        const response = await axios.get(`https://phim.nguonc.com/api/film/${slug}`);
        const item = response.data.movie;

        if (!item) {
            throw new Error("Không tìm thấy thông tin phim.");
        }

        // Lấy danh sách các tập phim từ từng server
        const episodes = item.episodes?.map((server) => ({
            server_name: server.server_name,
            items: server.items.map((ep) => ({
                name: ep.name,
                embed: ep.embed,
            })),
        })) || [];

        return {
            name: item.name,
            original_name: item.original_name,
            time: item.time,
            slug: item.slug,
            thumb_url: item.thumb_url,
            poster_url: item.poster_url,
            casts: item.casts,
            created: item.created,
            modified: item.modified,
            total_episodes: item.total_episodes,
            current_episode: item.current_episode,
            language: item.language,
            description: item.description,
            director: item.director || "Đang cập nhật",
            category: item.category[2]?.list.map((c) => c.name).join(', ') || "Đang cập nhật",
            country: item.category[3]?.list.map((c) => c.name).join(', ') || "Đang cập nhật",
            duration: item.time,
            trailer_url: item.trailer_url || "",
            episodes, // Thêm danh sách tập phim vào đây
        };
    } catch (error) {
        console.error("Lỗi lấy chi tiết phim:", error);
        return null;
    }
}


