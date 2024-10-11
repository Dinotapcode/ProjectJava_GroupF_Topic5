// src/pages/users/blogPage.js
import { BlogComponents } from './index'; // Đảm bảo đường dẫn đúng

// Tạo một component BlogPage
const BlogPage = () => {
  return (
    <div>
      <BlogComponents.Post img="your_image_url" />
      <BlogComponents.Posts />
      <BlogComponents.SinglePost />
    </div>
  );
};

// Xuất khẩu BlogPage như là default export
export default BlogPage;
