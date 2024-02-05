import * as tf from '@tensorflow/tfjs';
import {useEffect, useState} from "react";
import axios from "axios";

export default function Temp() {
    const [WORD_COUNTS, SET_WORD_COUNTS] = useState()
    const [model, setModel] = useState()
    const [arrWord, setArrWord] = useState([])
    const labelClasses = ['Clean', 'Appliances', 'Windows', 'Kitchen', 'Bathroom', 'Floors', 'Carpet', 'Paint', 'Exteriors', 'Furniture', 'Repair', 'Electric', 'Plumbing', 'Build', 'Decorate', 'Mirror', 'Walls', 'Rooms', 'Pillows & Throws'];

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
                const model_ = await tf.loadLayersModel('http://127.0.0.1//Temp/model.json');
                // model_.summary()
                setModel(model_)
            } catch (e) {
                console.log(e)
            }
        }

        loadModel()
    }, [])

    const handleEnterText = (e) => {
        e.target.value.length !== 0 ? processText(e.target.value) : e.preventDefault()
    }

    const desiredLength = 100;
    const processText = (text) => {
        const sanitizedInput = text.replace(/[!"#$%&()*+,-./:;<=>?@[\\\]^_`{|}~\t\n]/g, "").replace(/(^|\s)'|'(\s|$)/g, "$1$2").trim();
        const words = sanitizedInput.split(/\s+/);
        const filteredWords = words.filter(word => word && WORD_COUNTS[word]);
        const inputArray = filteredWords.map(word => WORD_COUNTS[word] || 0);
        while (inputArray.length < desiredLength) {
            inputArray.push(0);
        }
        setArrWord(inputArray)
    }

    const forecast = () => {
        // Dự đoán
        const predictions = model?.predict(tf.tensor2d(arrWord, [1, desiredLength]));
        const predicted_labels = Array.from(predictions.dataSync())
            // .map((score, i) => ({class_name: label_class[i], score}))
            .map((score, i) => ({class_name: labelClasses[i], score}))
            .filter(item => item.score > 0);
        // Sắp xếp theo giảm dần theo giá trị dự đoán
        const sorted_labels = predicted_labels.sort((a, b) => b.score - a.score);
        // In kết quả
        // sorted_labels.forEach(({class_name, score}) => {
        //     console.log(class_name + ":" + score * 100);
        // });
        return sorted_labels
    }

    const handleApply = async () => {
        // forecast().forEach(({class_name, score}) => {
        //     if (score * 100 >= 25) {
        //         console.log(class_name + ":::" + score * 100);
        //     }
        // })
        try {
            if (forecast().length > 0){
                await axios.post('http://localhost:3001/training/forecast', {forecast: JSON.stringify(forecast())})
            }
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div style={{marginTop: "80px"}}>
                <input id={"inputText"} type="text" placeholder="Nhập text vào đây bro!"
                       onChange={handleEnterText}/>
                <button onClick={handleApply}>Xác nhận</button>
            </div>
        </>
    )
}