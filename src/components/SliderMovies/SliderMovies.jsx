import React from 'react';
import Slider from 'react-slick';
import Movie from '../Movie/Movie';

export default function SliderMovies({ films }) {
    return (
        <div className="slider-movies">
            <h3 className="text-xl font-semibold text-yellow-300 mb-4">CÓ THỂ BẠN MUỐN XEM?</h3>
            <div className="px-6">
                <Slider
                    dots={false}
                    infinite={true}
                    speed={500}
                    slidesToShow={4}
                    slidesToScroll={1}
                    arrows={true}
                    responsive={[
                        {
                            breakpoint: 1024,
                            settings: { slidesToShow: 4 }
                        },
                        {
                            breakpoint: 768,
                            settings: { slidesToShow: 2 }
                        },
                        {
                            breakpoint: 480,
                            settings: { slidesToShow: 2 }
                        }
                    ]}
                >
                    {films && films.slice(0, 10).map((p) => (
                        <div key={p.slug} className="" onClick={() => window.location.href = `/phim/${p.slug}`}>
                            <Movie movie={p} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}