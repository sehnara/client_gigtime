import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import List from '../../components/List';

const mockDict = [
    [
        '2022-08-20',
        '설거지',
        '2', // order_id
        '20:00,10250,왕경업,14', // 마지막꺼는 hourly_order_id
        '12:00,10265,왕경업,15',
        '20:00,10250,왕경업,16', // 마지막꺼는 hourly_order_id
        '12:00,10265,왕경업,17',
        '20:00,10250,왕경업,18', // 마지막꺼는 hourly_order_id
        '12:00,10265,왕경업,19',
    ],
    // [
    //     위와 같은 양식
    // ],
];

const RecruitTable = () => {
    const keyRef = useRef(1);
    const [data, setData] = useState([[]]);

    const getData = async () => {
        await axios
            .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/work`, { owner_id: Number(sessionStorage.getItem('owner_id')) })
            .then((res) => {
                setData(res.data);
            });
    };
    useEffect(() => {
        getData();
    }, []);

    console.log('>>>>', data);

    return (
        <div className="m-8">
            {data.map((e) => {
                console.log(data);
                keyRef.current += 1;
                return <List key={keyRef.current} date={e[0]} type={e[1]} datas={e.slice(3)} mode={'OWNER'} />;
            })}
        </div>
    );
};

export default RecruitTable;
