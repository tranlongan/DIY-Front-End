import {Line} from "react-chartjs-2";
import Chart from 'chart.js/auto'
import {useEffect, useState} from "react";
import axios from "axios";

export default function LineChild() {
    const [total, setTotal] = useState([])
    const [arrDate, setArrDate] = useState([])
    const [counts, setCounts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/admin/getRank`)
            .then(res => {
                setTotal(res.data.rank)
            })

        let currentDate = new Date();
        let arrDate = [];
        arrDate.push(currentDate.toISOString().split('T')[0]);
        for (let i = 0; i < 7; i++) {
            currentDate.setDate(currentDate.getDate() - 7);
            arrDate.push(currentDate.toISOString().split('T')[0]);
        }
        arrDate.reverse()
        setArrDate(arrDate)
    }, [])

    const arr = [
        {
            profile: {iUser: 1, fullName: 'user1'},
            posts: [{idPost: 1, datePost: '2024-01-09T17:00:00.000Z'}, {
                idPost: 2,
                datePost: '2024-01-08T17:00:00.000Z'
            }, {idPost: 3, datePost: '2024-01-05T17:00:00.000Z'}]
        },
        {
            profile: {iUser: 2, fullName: 'user2'},
            posts: [{idPost: 4, datePost: '2024-01-03T17:00:00.000Z'}, {
                idPost: 5,
                datePost: '2024-01-09T17:00:00.000Z'
            }, {idPost: 6, datePost: '2024-01-01T17:00:00.000Z'}]
        }
    ];

    useEffect(() => {
        if (total.length > 0 && arrDate.length > 0) {
            let counts = new Array(8).fill(0);

            // Hàm kiểm tra xem một ngày có nằm trong khoảng thời gian giữa hai ngày khác hay không
            const isWithinRange = (date, start, end) => {
                return date >= start && date <= end;
            };

            // Tính toán số lượng phần tử của posts có giá trị datePost thỏa mãn bằng với ngày hiện tại
            total.forEach(user => {

                user.posts.forEach(post => {

                    // Chuyển đổi datePost sang định dạng yyyy-mm-dd
                    // let isoDate = post.datePost.split('T')[0];
                    let isoDate = post.datePost.split('T')[0];
                    const newDate = new Date(post.datePost)
                    // newDate.setDate(newDate.getDate() + 1)
                    let isoDate1 = newDate.toISOString().split('T')[0];
                    if (isoDate1 === arrDate[arrDate.length - 1]) {
                        counts[counts.length - 1]++;
                    }
                });
            });

            // Tính toán số lượng phần tử của posts, bắt đầu từ phần tử arrDate[7] cho tới các mốc còn lại
            total.forEach(user => {
                user.posts.forEach(post => {
                    // Chuyển đổi datePost sang định dạng yyyy-mm-dd
                    let isoDate = post.datePost.split('T')[0];

                    for (let i = 0; i < arrDate.length - 1; i++) {
                        if (isWithinRange(new Date(isoDate), new Date(arrDate[i]), new Date(arrDate[i + 1]))) {
                            counts[i]++;
                        }
                    }
                });
            });

            setCounts(counts);
        }
    }, [total, arrDate]);

    const data = {
        labels: arrDate,
        datasets: [
            {
                label: "Posts",
                data: counts,
                fill: true, // Đây là phần quan trọng để tạo biểu đồ miền
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };
    return (
        <>
            <h1>Line child</h1>
            <Line data={data}/>
        </>
    )
}