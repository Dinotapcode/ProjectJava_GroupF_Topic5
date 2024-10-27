import AdminPage from './pages/adminPage/AdminPage';

// Trong hàm renderUserRouter hoặc tạo hàm mới renderAdminRouter
const renderAdminRouter = () => {
    return (
        <MasterLayout>
            <Routes>
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </MasterLayout>
    );
};
