import { createPortal } from "react-dom";

export const Rules = ({ open = false, handleClose, ...props }) => {
    if (typeof document === "undefined") return <div className="modal"></div>;
    return createPortal(
        <div className="modal">
            <div className="overlay" onClick={handleClose}></div>
            <span className="closeModalBtn" onClick={handleClose}>
                X
            </span>
            <div className="modal-content rules">
                <div className="rules-content">
                    <p>
                        {" "}
                        - Các nút và chức năng:
                        <br />
                        + "Shuffle": trộn bài. <br />
                        + "Reveal": xem kết quả và lật bài toàn bộ. <br />
                        + "Draw": chia bài <br />
                        + "Reset": chơi lại từ đầu. <br />
                        - Bạn sẽ là "Player 1"
                        <br />
                        - Bộ bài có 52 lá. Khi hết bài sẽ được đổi bộ mới.
                        <br />- Chia bài từng người theo thứ tự từ phải sang
                        trái, mỗi người 3 lá. Nếu không đủ bài để chia thì sẽ
                        nhận thông báo và được đổi sang bộ bài mới. Điểm của lần
                        chơi trước đó sẽ không bị mất.
                        <br />
                        - Điểm của mỗi người bằng tổng 3 lá bài lấy số cuối cùng
                        <br />
                        - Lá bài tính điểm:
                        <br /> + Theo giá trị: 1(A) , 2, 3, 4, 5, 6, 7, 8, 9
                        <br /> + Đối với lá J, Q, K mỗi lá = 10 điểm
                        <br />
                        - Người chơi hết tiền (coins) sẽ nhận thông báo và ván
                        sau sẽ không được tham gia ván tiếp theo.
                        <br />- Nếu người thua là "Player 1" là chúng ta đã
                        thua.
                    </p>
                </div>
            </div>
        </div>,
        document.querySelector("body")
    );
};
