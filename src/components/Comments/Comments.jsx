import React, { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';

const Comments = () => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle comment submission logic here
        console.log('Comment submitted:', comment);
        setComment('');
    };

    return (
        <div className="my-4 rounded-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-yellow-300 mb-3 sm:mb-4 flex items-center gap-2">
                BÌNH LUẬN <FaCommentDots />
            </h3>

            <div className="bg-[#263946] rounded-lg p-2 sm:p-2">
                <form className="mb-4 sm:mb-6" onSubmit={handleSubmit}>
                    <textarea
                        className="rounded-lg w-full p-2 sm:p-3 bg-[#1a2836] text-sm sm:text-base text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
                        rows="3"
                        placeholder="Viết bình luận của bạn..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            type="submit"
                            className="flex items-center gap-1 sm:gap-2 text-yellow-400 text-base sm:text-xl hover:text-yellow-300 transition-colors"
                        >
                            <span className="text-sm sm:text-base">Gửi</span>
                            <IoMdSend className="text-xl sm:text-2xl" />
                        </button>
                    </div>
                </form>
            </div>

            <div className="fb-comments w-full overflow-x-auto"
                data-href={window.location.href}
                data-width="100%"
                data-numposts="5"
                data-colorscheme="dark">
            </div>
        </div>
    );
};

export default Comments;