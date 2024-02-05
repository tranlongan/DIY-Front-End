import style from './search.module.css'
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";


export default function Search() {
    const navigate = useNavigate()
    const [query] = useSearchParams()
    const [isModelReady, setIsModelReady] = useState(false)
    const [WORD_COUNTS, SET_WORD_COUNTS] = useState({})
    const [model, setModel] = useState()
    const [arr, setArr] = useState([])
    const labelClasses = ['Clean', 'Appliances', 'Windows', 'Kitchen', 'Bathroom', 'Floors', 'Carpet', 'Paint', 'Exteriors', 'Furniture', 'Repair', 'Electric', 'Plumbing', 'Build', 'Decorate', 'Mirror', 'Walls', 'Rooms', 'Pillows & Throws'];

    const drawCanvas = (canvas) => {
        const COLOR = '#937341'
        if (canvas) {
            for (let i = 0; i < canvas.length; i++) {
                const ctx = canvas[i].getContext("2d");
                ctx.globalCompositeOperation = 'destination-over';
                canvas[i].style.transition = "0.8s"
                // góc trên bên trái
                ctx.beginPath();
                ctx.lineTo(0, 100)
                ctx.lineTo(0, 0)
                ctx.lineTo(100, 0);
                ctx.strokeStyle = COLOR
                ctx.lineWidth = 1;
                ctx.stroke()
                ctx.closePath()

                // góc trên bên phải
                ctx.beginPath();
                ctx.lineTo(240, 0)
                ctx.lineTo(340, 0)
                ctx.lineTo(340, 100);
                ctx.strokeStyle = COLOR
                ctx.lineWidth = 1;
                ctx.stroke()
                ctx.closePath()

                // góc dưới bên trái
                ctx.beginPath();
                ctx.lineTo(0, 240)
                ctx.lineTo(0, 340)
                ctx.lineTo(340, 340);
                ctx.lineTo(340, 240);

                ctx.strokeStyle = COLOR
                ctx.lineWidth = 1;
                ctx.stroke()
                ctx.closePath()
            }
        } else {
            return;
        }
    }

    useEffect(() => {
        const canvas = document.querySelectorAll("#canvas")
        drawCanvas(canvas)
    })

    useEffect(() => {
        async function getTokenizer() {
            try {
                const result = await axios.get('http://localhost:3001/training/tokenizer')
                SET_WORD_COUNTS(result.data.config.word_counts)
            } catch (e) {
                console.log(e)
            }
        }

        getTokenizer()

        async function loadModel() {
            try {
                const model_ = await tf.loadLayersModel('http://127.0.0.1//NLP/model.json');
                // model_.summary()
                setModel(model_)
                setIsModelReady(true)
            } catch (e) {
                console.log(e)
            }
        }

        loadModel()
    }, [])

    const desiredLength = 100;

    const processText = (text) => {
        const sanitizedInput = text.toLowerCase().replace(/[!"#$%&()*+,-./:;<=>?@[\\\]^_`{|}~\t\n]/g, "").replace(/(^|\s)'|'(\s|$)/g, "$1$2").trim();
        const words = sanitizedInput.split(/\s+/);
        const filteredWords = words.filter(word => word && WORD_COUNTS[word]);
        const inputArray = filteredWords.map(word => WORD_COUNTS[word] || 0);
        while (inputArray.length < desiredLength) {
            inputArray.push(0);
        }
        return inputArray
    }

    const forecast = async (text) => {
        if (processText(text)?.length > 0 && isModelReady) {
            const predictions = model?.predict(tf.tensor2d(processText(text), [1, desiredLength]));
            const data = await predictions.dataSync();
            const predicted_labels = Array.from(data)
                .map((score, i) => ({class_name: labelClasses[i], score}))
                .filter(item => item.score > 0);
            const sorted_labels = predicted_labels.sort((a, b) => b.score - a.score);
            return sorted_labels;
        }
        return [];
    }

    useEffect(() => {
        const sendForecast = async () => {
            try {
                if (isModelReady) {
                    const forecastData = await forecast(query.get('search'))
                    console.log(forecastData)
                    const res = await axios.post(`http://localhost:3001/training/forecast?search=${query.get('search')}`, {forecast: JSON.stringify(forecastData)})
                    console.log(res.data.arr)
                    setArr(res.data.arr)
                }
            } catch (e) {
                console.log(e)
            }
        }
        sendForecast()
    }, [isModelReady]);

    return (
        <>
            {
                arr.length !== undefined &&
                <div>
                    Loading.......................
                </div>
            }
            {
                arr.length > 0 &&
                <div className={style.search}>
                    <div className={style.title}>
                        <div className={style.label}>Content search:</div>
                        <span>{query.get('search')}</span>
                    </div>

                    <div className={style.boxCards}>
                        {
                            arr?.map((data, index) => (
                                <div key={index} className={style.card}>
                                    <canvas id={'canvas'} width={340} height={340}/>
                                    <div className={style.titleCard}>
                                        Project
                                    </div>
                                    <div className={style.item}>
                                        <div className={style.boxImg}
                                             onClick={() => navigate(`/diy/${data.id_of_project}/${data.title_post}`, {
                                                 state: {
                                                     idPost: data.id_post,
                                                     idUser: data.id_of_user
                                                 }
                                             })}>
                                            <img alt={"img"}
                                                 className={style.illustration} src={data.illustration_post}/>
                                        </div>
                                        <div className={style.info}>
                                            <div className={style.boxInfo}>
                                                <img
                                                    src={data.avatar}
                                                    alt={"avatar"}/>
                                                <div>
                                                    {data.title_post}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}