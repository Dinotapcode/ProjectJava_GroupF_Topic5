import { memo } from 'react';
import './style.scss';
import home1 from '../../../assets/users/images/img_home/home1.jpg'
import home2 from '../../../assets/users/images/img_home/home2.webp'
import koi1 from '../../../assets/users/images/img_sp/1.png'
import ho1 from '../../../assets/users/images/img_sp/aquarium.jpg'
import blog1 from '../../../assets/users/images/img_blog/anh1.jpg'
import blog2 from '../../../assets/users/images/img_blog/anh2.jpg'
import blog3 from '../../../assets/users/images/img_blog/anh3.jpg'
import blog4 from '../../../assets/users/images/img_blog/anh4.jpg'

const HomePage = () => {
    return (
        <div className="container">
            <div className="homePage">
                <div className="intro-sections">
                    <div><h2>Chào mừng bạn đến với Fengshuikoi !</h2> <br />
                        Fengshuikoi, nơi mà bạn sẽ được tư vấn để sở hữu cho mình cá Koi phong thủy phù hợp nhất với bản thân...
                    </div>
                    <img src={home1} alt="first-img"></img>
                </div>
                <div className="product-sections">
                    <div className="title">
                        Một số giống cá koi đẹp<hr></hr>
                    </div>
                    <div className="product-cards">
                        <div className="product-card">
                            <div className="product-card-image">
                                <img src={koi1} alt="product 1" />
                            </div>
                            <div className="product-card-title">
                                Sản Phẩm 1
                            </div>
                            <div className="product-card-description">
                                Xem Ngay
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-card-image">
                                <img src={ho1} alt="product 2" />
                            </div>
                            <div className="product-card-title">
                                Sản Phẩm 2
                            </div>
                            <div className="product-card-description">

                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-card-image">
                                <img src={koi1} alt="product 3" />
                            </div>
                            <div className="product-card-title">
                                Sản Phẩm 3
                            </div>
                            <div className="product-card-description">

                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-card-image">
                                <img src={koi1} alt="product 4" />
                            </div>
                            <div className="product-card-title">
                                Sản Phẩm 4
                            </div>
                            <div className="product-card-description">

                            </div>
                        </div>
                    </div>
                    <div className="know-more">
                        <a href="/san-pham-phong-thuy">Xem thêm tại đây </a>
                    </div>

                </div>
                <div className="suggest-sections"> 
                    <div class="styled-text">
                    <h2>Nếu bạn vẫn chưa biết cách chọn cá Koi phong thủy phù hợp<br/> 
                    Hãy đến với dịch vụ tư vấn và tra cứu của chúng tôi </h2>
                    <a href="/tra-cuu-phong-thuy">Tại Đây</a>
                    </div>
                    
                    <img src={home2}></img>
                </div>
                <div className="news-sections">
                    <div className="title">
                        Tin tức nổi bật về cá Koi phong thủy<hr />
                    </div>
                    <div className="news-cards">
                        <div className="news-card">
                            <div className="news-card-image">
                                <img src={blog1} alt="new 1" />
                            </div>
                            <div className="news-card-title">
                                <a href="">Hiểu về cá Koi trong phong thủy</a>
                            </div>
                            <div className="news-card-description">
                                
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-card-image">
                                <img src={blog2} alt="new 2" />
                            </div>
                            <div className="news-card-title">
                                <a href="">Cách chọn hồ phù hợp cho cá Koi của bạn</a>
                            </div>
                            <div className="news-card-description">
                                
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-card-image">
                                <img src={blog3} alt="new 3" />
                            </div>
                            <div className="news-card-title">
                               <a href="">Ngũ hành và cách chọn cá Koi</a>

                            </div>
                            <div className="news-card-description">
                                
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-card-image">
                                <img src={blog4} alt="new 4" />
                            </div>
                            <div className="news-card-title">
                                <a href="">Tin 4</a>
                            </div>
                            <div className="news-card-description">
                                
                            </div>
                        </div>
                    </div>

                    <div className="know-more">
                        <a href="/blog">Xem thêm tại đây </a>
                    </div>
                </div>
                
            </div>
        </div>
    );
};
export default memo(HomePage);