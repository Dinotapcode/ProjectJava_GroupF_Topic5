// src/index.js
import { Link } from "react-router-dom";
import './style.scss';

// Combined components as a single constant
export const BlogComponents = {
  Post: ({ img }) => (
    <div className="post">
      <img className="postImg" src={img} alt="" />
      <div className="postInfo">
        <span className="postTitle">
          <Link to="/post/abc" className="link">
            KOI KOI FENG SHUI
          </Link>
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">Lots of Koi fish</p>
    </div>
  ),
  
  Posts: () => (
    <div className="posts">
      <BlogComponents.Post img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTChRK-CfIjQUIkhOOJ9R-F5p7NuCssA8h5sA&s" />
      <BlogComponents.Post img="https://upload.wikimedia.org/wikipedia/commons/1/10/Ojiya_Nishikigoi_no_Sato_ac_%283%29.jpg" />
      <BlogComponents.Post img="https://nonbo.net.vn/wp-content/uploads/2019/03/Cac-loai-ca-koi-duoc-nuoi-nhieu-nhat.jpg" />
      <BlogComponents.Post img="https://ran.com.vn/wp-content/uploads/2021/02/Ca-Koi-Nhat-Ban-1.jpeg" />
      <BlogComponents.Post img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBow9xg4vKizGV6UoXHcHFdSeSLMMWBvSp_Q&s" />
    </div>
  ),

  SinglePost: () => (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Hv6UUYk3tTxS_w5zyT1Pzd4KsRA5r2bVoQ&s"
          alt=""
        />
        <h1 className="singlePostTitle">
          Lorem ipsum dolor
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
                Safak
              </Link>
            </b>
          </span>
          <span>1 day ago</span>
        </div>
        <p className="singlePostDesc">
          Koi koi koi koi koi koi koi koi Koi koi koi koi koi koi koi koi
          Koi koi koi koi koi koi koi koi Koi koi koi koi koi koi koi koi
          Koi koi koi koi koi koi koi koi Koi koi koi koi koi koi koi koi
          Koi koi koi koi koi koi koi koi Koi koi koi koi koi koi koi koi
          <br />
          <br />
          Koi koi koi koi koi koi koi koi Koi koi koi koi koi koi koi koi
          Koi koi koi koi koi koi koi koi Koi koi koi koi koi koi koi koi
          Koi koi koi koi koi koi koi koi Koi koi koi koi koi koi koi koi
        </p>
      </div>
    </div>
  ),
};
