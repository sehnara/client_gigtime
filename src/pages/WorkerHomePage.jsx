import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreCard from '../components/StoreCard';
import { useDispatch, useSelector } from 'react-redux';
import man from '../images/worker.png';
import axios from 'axios';
import { setCurrentOrder } from '../module/slices/order';
import { setStoreId } from '../module/slices/store';
import NavBar from '../components/NavBar';
import Empty from '../components/Empty';
import { AiOutlinePlus } from 'react-icons/ai';

const WorkerHomePage = () => {
    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const loc = state.sign.location.split(' ');
    const locName = `${loc[0]} ${loc[1]} ${loc[2]}`;
    const [loca, setLoc] = useState('');
    const [range, setRange] = useState('');
    const [name, setName] = useState('');

    const [stores, setStores] = useState([]);
    const dispatch = useDispatch();

    const onNextPage = (e) => {
        dispatch(setStoreId(e));
        navigate('/worker/interview');
    };

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/addr/range`, {
                worker_id: sessionStorage.getItem('worker_id'),
            })
            .then((res) => {
                setLoc(res.data[0].location);
                setRange(res.data[0].range);
                setName(res.data[0].name);
            });
    }, []);

    const getStoreList = async () => {
        await axios
            .post(`${process.env.REACT_APP_ROUTE_PATH}/store/list`, {
                worker_id: sessionStorage.getItem('worker_id'),
            })
            .then((res) => {
                console.log('>>>>', res.data);
                if (res.data === 'error - store/list') {
                    setStores([]);
                } else {
                    setStores(res.data);
                }
            });
    };
    useEffect(() => {
        getStoreList();
    }, []);

    return (
        <div className="font-sans">
            <button
                onClick={() => navigate('/worker/speed')}
                className="flex justify-center items-center  bg-cyan-500 text-3xl font-extrabold rounded-full w-16 h-16  text-white fixed bottom-0 right-0 m-4 "
            >
                <AiOutlinePlus />
            </button>
            <NavBar />
            {/* 상단 */}
            <div className=" m-8  flex items-center justify-between">
                <h1 className="text-2xl font-bold">{loca}</h1>
                <p className="text-sm font-normal text-slate-600 mt-2">
                    내 주변 <span className="font-extrabold">{range}m</span>
                </p>
            </div>
            {/* 중반 */}
            <div className="flex m-8 mt-10">
                <div className="flex-column">
                    <p className="text-2xl mb-0.5 font-medium">이제는</p>
                    <p className="text-2xl mb-0.5 font-medium">
                        <span className="text-cyan-500  font-extrabold">바로 알바</span>
                    </p>
                    <p className="text-2xl mb-0.5 font-medium">할 시간!</p>
                </div>
                <img src={man} alt="walking man" width="150" className="transform translate-x-12" />
            </div>
            {/* 하단 */}
            <div className="border-t-4 "></div>
            <div className="m-8 ">
                <h1 className="text-xl font-bold mb-4">{name}님을 기다리고 있어요.</h1>
                <div>
                    {stores && stores.length !== 0 ? (
                        stores.map((store) => {
                            return (
                                <StoreCard
                                    key={store.store_id}
                                    store={store.name}
                                    distance={store.distance}
                                    jobs={['카운터', '서빙']}
                                    storeImage={`${process.env.REACT_APP_S3_PATH}${store.background_image}`}
                                    minPay={store.minimum_wage}
                                    ment={store.description}
                                    onClickEvent={() => {
                                        onNextPage(store.store_id);
                                    }}
                                />
                            );
                        })
                    ) : (
                        <Empty text={'일감'} margin={10} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkerHomePage;
