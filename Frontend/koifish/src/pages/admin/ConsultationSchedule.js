import React, { useState, useEffect } from 'react';
import './ConsultationSchedule.scss';

const ConsultationSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch schedules when the component loads
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:8083/api/admin/consultation/all',
                    {
                        headers: {
                            Authorization: sessionStorage.getItem('authHeader')
                        }
                    }
                );
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

    // Handle delete schedule
    const handleDeleteSchedule = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa lịch tư vấn này?')) return;

        try {
            const response = await fetch(`http://localhost:8083/api/admin/consultation/delete/${id}`, {
                headers: {
                    Authorization: sessionStorage.getItem('authHeader'),
                },
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
                                        <button className="delete" onClick={() => handleDeleteSchedule(schedule.consultationsId)}>Xóa</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ConsultationSchedule;
