import { memo } from 'react';
import './style.scss';
import koi1 from '../../../assets/users/images/img_gioithieu/koi1.jpg';
import koi2 from '../../../assets/users/images/img_gioithieu/koi2.jpg';
import koi3 from '../../../assets/users/images/img_gioithieu/koi3.jpg';
import koi4 from '../../../assets/users/images/img_gioithieu/koi4.jpg';
import koi5 from '../../../assets/users/images/img_gioithieu/koi5.jpg';

const GioithieuPage = () => {
    return (
        <div className='container'>
            <article className='gioithieu-container'>
                <h2>Giới thiệu</h2>
                <h3>Chào Mừng Bạn Đến Với Dịch Vụ Tư Vấn Phong Thủy Cá Koi - Kiến Tạo Thịnh Vượng Và Hài Hòa Cho Không Gian Sống</h3>
                <section className='paragraph-1'>
                    <p>Cá Koi không chỉ đơn thuần là loài cá cảnh phổ biến mà còn được xem như biểu tượng của may mắn, thành công và tài lộc trong văn hóa Á Đông. Việc nuôi cá Koi, đặc biệt là trong một không gian được bố trí theo nguyên tắc phong thủy, có thể giúp gia chủ thu hút nguồn năng lượng tích cực, thúc đẩy sự thịnh vượng và bình an cho gia đình và doanh nghiệp.</p>
                    <img src={koi1} alt=" Ảnh Cá Koi" className="image-koi paragraph-1__koi-1 " />
                </section>
                

                <div>
                    <h3>Tầm Quan Trọng Của Phong Thủy Trong Việc Nuôi Cá Koi</h3>
                    <p>Theo quan niệm phong thủy, nước là biểu tượng của sự thịnh vượng, dòng chảy của năng lượng và tài lộc. Hồ cá Koi không chỉ là một yếu tố trang trí độc đáo mà còn đóng vai trò như một "nguồn tài khí" trong phong thủy. Vị trí đặt hồ cá, hướng nước chảy, cùng với việc chọn lựa giống cá phù hợp đều có ảnh hưởng trực tiếp đến vận mệnh và tài vận của gia chủ.

                        Chúng tôi hiểu rằng mỗi không gian, mỗi cá nhân đều có những nhu cầu và đặc điểm riêng, vì vậy, việc thiết kế hồ cá Koi không chỉ đòi hỏi sự sáng tạo mà còn cần sự tinh tế trong từng chi tiết để đảm bảo sự cân bằng về phong thủy.</p>
                    <img src={koi2} alt="Ảnh Hồ Cá Koi" className="image-koi paragraph-1__koi-2" />

                    <br />
                    <h3>Dịch Vụ Tư Vấn Phong Thủy Cá Koi Của Chúng Tôi</h3>
                    <p>Tại dịch vụ tư vấn phong thủy cá Koi, chúng tôi mang đến một trải nghiệm trọn vẹn từ khâu tư vấn, thiết kế cho đến thi công hồ cá. Với đội ngũ chuyên gia giàu kinh nghiệm trong cả lĩnh vực phong thủy và nghệ thuật thiết kế cảnh quan hồ cá Koi, chúng tôi cam kết sẽ mang lại cho bạn những giải pháp tối ưu nhất.</p>
                    <img src={koi3} alt="Ảnh Hồ Cá Koi" className="image-koi paragraph-1__koi-3" />

                    <h3>Dưới Đây Là Những Dịch Vụ Mà Chúng Tôi Cung Cấp:</h3>
                    <p>
                        1.<b>Tư vấn phong thủy toàn diện</b>: Chúng tôi sẽ đến tận nơi để khảo sát không gian và đưa ra giải pháp về vị trí, hướng đặt hồ cá Koi phù hợp với ngũ hành, âm dương và mệnh của gia chủ.
                        <br />
                        2.<b>Thiết kế hồ cá Koi theo phong thủy</b>: Mỗi thiết kế của chúng tôi đều dựa trên những nguyên tắc phong thủy truyền thống, đảm bảo không gian hồ cá hài hòa với môi trường xung quanh, từ đó thu hút năng lượng tích cực.
                        <br />
                        3.<b>Lựa chọn và phối giống cá Koi</b>: Cá Koi có nhiều loại với màu sắc và hình dáng khác nhau, mỗi loại đều mang một ý nghĩa phong thủy riêng. Chúng tôi sẽ giúp bạn lựa chọn những giống cá phù hợp, cân bằng ngũ hành và tăng cường tài vận.
                        <br />
                        4.<b>Bảo dưỡng và chăm sóc hồ cá</b>: Ngoài việc thiết kế và thi công, chúng tôi còn cung cấp dịch vụ bảo dưỡng định kỳ, đảm bảo hồ cá Koi luôn trong trạng thái tốt nhất, cả về mặt phong thủy lẫn sức khỏe của cá.</p>
                    <img src={koi4} alt="Ảnh Hồ Cá Koi" className="image-koi paragraph-1__koi-4" />

                    <h3>Tại Sao Bạn Nên Chọn Chúng Tôi?</h3>
                    <p>
                        1.<b>Kiến thức chuyên sâu về phong thủy</b>: Với nhiều năm kinh nghiệm, chúng tôi hiểu rõ các nguyên tắc phong thủy và cách áp dụng chúng trong thiết kế hồ cá Koi.
                        <br />
                        2.<b>Thiết kế độc đáo và cá nhân hóa</b>: Mỗi dự án đều được tùy chỉnh sao cho phù hợp với không gian, sở thích và vận mệnh của gia chủ.
                        <br />
                        3.<b>Chất lượng và uy tín</b>: Chúng tôi luôn sử dụng các vật liệu và cá giống chất lượng cao, đảm bảo hồ cá Koi của bạn không chỉ đẹp mà còn bền vững theo thời gian.
                        <br />
                        4.<b>Dịch vụ tận tâm và chuyên nghiệp</b>: Đội ngũ tư vấn viên và kỹ sư của chúng tôi luôn sẵn sàng lắng nghe và đáp ứng mọi yêu cầu của bạn, từ khâu tư vấn đến bảo dưỡng sau thi công.
                    </p>
                    <img src={koi5} alt="Ảnh Hồ Cá Koi" className="image-koi paragraph-1__koi-5" />

                    <br />
                    <h3>Mang Lại Sự Cân Bằng, Thịnh Vượng Và An Lạc</h3>
                    <p>
                        Hồ cá Koi không chỉ là một phần trong trang trí không gian mà còn là yếu tố quan trọng giúp cân bằng năng lượng phong thủy, mang lại sự thịnh vượng và hạnh phúc cho gia đình bạn. Hãy để chúng tôi giúp bạn kiến tạo một không gian sống hài hòa, đẹp mắt và tràn đầy may mắn thông qua dịch vụ tư vấn phong thủy cá Koi.
                        <br />
                        Liên hệ ngay với chúng tôi để bắt đầu hành trình mang lại năng lượng tích cực cho ngôi nhà của bạn!
                    </p>
                </div>
            </article>
        </div>
    );
};

export default memo(GioithieuPage);