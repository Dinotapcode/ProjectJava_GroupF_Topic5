import { memo } from 'react';
import './style.scss';
import home1 from '../../../assets/users/images/img_home/home1.jpg'
import koi1 from '../../../assets/users/images/img_sp/1.png'
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
                                <img src={koi1} alt="product 2" />
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
                        <a href="#">Xem thêm tại đây </a>
                    </div>

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
                                Tin 1
                            </div>
                            <div className="news-card-description">

                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-card-image">
                                <img src={blog2} alt="new 2" />
                            </div>
                            <div className="news-card-title">
                                Tin 2
                            </div>
                            <div className="news-card-description">

                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-card-image">
                                <img src={blog3} alt="new 3" />
                            </div>
                            <div className="news-card-title">
                                Tin 3

                            </div>
                            <div className="news-card-description">

                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-card-image">
                                <img src={blog4} alt="new 4" />
                            </div>
                            <div className="news-card-title">
                                Tin 4
                            </div>
                            <div className="news-card-description">

                            </div>
                        </div>
                    </div>

                    <div className="know-more">
                        <a href="#">Xem thêm tại đây </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default memo(HomePage);