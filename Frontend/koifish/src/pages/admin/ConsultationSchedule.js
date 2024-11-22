import React, { useState, useEffect } from 'react';
import './ConsultationSchedule.scss';

const ConsultationSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [newSchedule, setNewSchedule] = useState({
        contact: '',
        date: '',
        time: '',
    });

    // Fetch schedules when the component loads
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:8083/api/public/consultation/all');
                if (!response.ok) throw new Error('Could not fetch consultation schedules.');
                const data = await response.json();
                setSchedules(data);
            } catch (error) {
                console.error('Error fetching schedules:', error);
                alert('Không thể tải lịch tư vấn.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSchedules();
    }, []);

    // Handle edit schedule
    const handleEditSchedule = (schedule) => {
        setEditingSchedule(schedule);
        setNewSchedule({
            contact: schedule.contact || '',
            date: schedule.date ? schedule.date.split('T')[0] : '',
            time: schedule.time ? schedule.time.split(':').slice(0, 2).join(':') : '',
        });
    };

    // Handle update schedule
    const handleUpdateSchedule = async (id) => {
        try {
            const response = await fetch(`http://localhost:8083/api/public/consultation/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSchedule),
            });

            if (!response.ok) throw new Error('Không thể cập nhật lịch hẹn.');
            const updatedSchedule = await response.json();
            setSchedules(schedules.map(schedule => schedule.consultationsId === id ? updatedSchedule : schedule));
            setEditingSchedule(null);
            setNewSchedule({
                contact: '',
                date: '',
                time: '',
            });
        } catch (error) {
            console.error('Error updating schedule:', error);
            alert('Không thể cập nhật lịch hẹn.');
        }
    };

    // Handle delete schedule
    const handleDeleteSchedule = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa lịch tư vấn này?')) return;

        try {
            const response = await fetch(`http://localhost:8083/api/public/consultation/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setSchedules(schedules.filter(schedule => schedule.consultationsId !== id));
                alert('Lịch tư vấn đã được xóa.');
            } else {
                alert('Không thể xóa lịch tư vấn.');
            }
        } catch (error) {
            console.error('Error deleting schedule:', error);
            alert('Không thể xóa lịch tư vấn.');
        }
    };

    // Handle input change for editing schedule
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSchedule({
            ...newSchedule,
            [name]: value,
        });
    };

    return (
        <div className="consultation-schedule">
            <h1>Lịch tư vấn</h1>

            {isLoading ? (
                <div className="loading">Đang tải dữ liệu...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Thông tin liên lạc</th>
                            <th>Ngày tư vấn</th>
                            <th>Thời gian</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule, index) => {
                            const date = schedule.date ? schedule.date.split('T')[0] : '';
                            const time = schedule.time ? schedule.time.split(':').slice(0, 2).join(':') : '';

                            return (
                                <tr key={schedule.consultationsId}>
                                    <td>{index + 1}</td>
                                    <td>{schedule.contact}</td>
                                    <td>{date || 'Chưa có ngày'}</td>
                                    <td>{time || 'Chưa có thời gian'}</td>
                                    <td>
                                        <button className="edit" onClick={() => handleEditSchedule(schedule)}>Chỉnh sửa</button>
                                        <button className="delete" onClick={() => handleDeleteSchedule(schedule.consultationsId)}>Xóa</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {editingSchedule && (
                <div className="edit-schedule">
                    <h2>Chỉnh sửa lịch tư vấn</h2>
                    <label>
                        Thông tin liên lạc:
                        <input
                            type="text"
                            name="contact"
                            value={newSchedule.contact}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Ngày tư vấn:
                        <input
                            type="date"
                            name="date"
                            value={newSchedule.date}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Thời gian tư vấn:
                        <input
                            type="time"
                            name="time"
                            value={newSchedule.time}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button className="update" onClick={() => handleUpdateSchedule(editingSchedule.consultationsId)}>Lưu thay đổi</button>
                    <button className="cancel" onClick={() => setEditingSchedule(null)}>Hủy bỏ</button>
                </div>
            )}
        </div>
    );
};

export default ConsultationSchedule;
