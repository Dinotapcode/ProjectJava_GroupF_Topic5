import { memo } from 'react';
import './style.scss';
const HomePage = () => {
    return (
        <div classname="container">
            <div classname="homePage">
                <div classname="product-sections">
                    <div className="title">
                        Sản Phẩm
                    </div>
                    <div className="product-cards">
                        <div className="product-card">
                            <div className="product-card-image">
                                <img src="/aquarium.jpg" alt="product 1" />
                            </div>
                            <div className="product-card-title">
                                Sản Phẩm 1
                            </div>
                            <div className="product-card-description">
                                
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-card-image">
                                <img src="" alt="product 2" />
                            </div>
                            <div className="product-card-title">
                                Sản Phẩm 2
                            </div>
                            <div className="product-card-description">
                                
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-card-image">
                                <img src="aquarium.jpg" alt="product 3" />
                            </div>
                            <div className="product-card-title">
                                Sản Phẩm 3
                            </div>
                            <div className="product-card-description">
                                
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-card-image">
                                <img src="aquarium.jpg" alt="product 4" />
                            </div>
                            <div className="product-card-title">
                                Sản Phẩm 4
                            </div>
                            <div className="product-card-description">
                               
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div classname="news-sections">
                    <div className="title">
                        Blog Tin Tức
                    </div>
                    <div className="news-cards">
                        <div className="news-card">
                            <div className="news-card-image">
                                <img src="/aquarium.jpg" alt="news 1" />
                            </div>
                            <div className="news-card-title">
                                Tin 1
                            </div>
                            <div className="news-card-description">
                                
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-card-image">
                                <img src="" alt="news 2" />
                            </div>
                            <div className="news-card-title">
                                Tin 2

                            </div>
                            <div className="news-card-description">
                                
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-card-image">
                                <img src="aquarium.jpg" alt="news 3" />
                            </div>
                            <div className="news-card-title">
                                Tin 4

                            </div>
                            <div className="news-card-description">
                                
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-card-image">
                                <img src="aquarium.jpg" alt="news 4" />
                            </div>
                            <div className="news-card-title">
                                Tin 4
                            </div>
                            <div className="news-card-description">
                               
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
export default memo(HomePage);