import React, {useEffect, useState} from 'react';
import {Chart, registerables} from 'chart.js';
import {Bar} from "react-chartjs-2";
import axios from "axios";

export default function RankChild() {
    const [rank, setRank] = useState([])
    const [option, setOption] = useState(366);

    useEffect(() => {
        axios.get(`http://localhost:3001/admin/getRank`)
            .then(res => {
                setRank(res.data.rank)
            })
    }, [])

    const handleChangeOption = (e) => {
        setOption(e.target.value)
    }

    const filteredArr = rank.map(item => {
        const filteredPosts = item.posts.filter(post => {
            const d1 = new Date();
            const d2 = new Date(post.datePost);
            const diffTime = Math.abs(d2 - d1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays <= option;
        });

        return {...item, posts: filteredPosts};
    });

    const sortedArr = [...filteredArr].sort((a, b) => {
        if (b.posts.length === a.posts.length) {
            return b.totalPosts - a.totalPosts;
        } else {
            return b.posts.length - a.posts.length;
        }
    });
    const top8 = sortedArr.slice(0, 8);
    const filteredArr1 = filteredArr.filter(item => top8.includes(item));

    const labels = filteredArr1.map(item => item.profile.fullName);
    const data = filteredArr1.map(item => item.posts.length);
    Chart.register(...registerables);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: '# post',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgb(77,255,64, 0.2)',
                    'rgb(134,84,90,0.2 )'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgb(255,204,69,1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgb(77,255,64,1)',
                    'rgb(134,84,90,1)'
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <div className='header'>
                <h1 className='title'>Rank</h1>
            </div>
            <div>
                <select
                    onChange={handleChangeOption}>
                    <option value={365}>1 năm</option>
                    <option value={31}>1 tháng</option>
                    <option value={7}>1 tuần</option>
                </select>
            </div>
            <Bar data={chartData} options={options}/>
        </>
    )
}