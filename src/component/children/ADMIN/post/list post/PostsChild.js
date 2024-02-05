import style from "./postsChild.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function PostsChild() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState({fullName: '', titlePost: '', datePost: ''});

    useEffect(() => {
        axios.get(`http://localhost:3001/admin/getPosts`)
            .then(res => {
                setPosts(res.data.posts)
            })
            .catch(err => console.log(err))
    }, [])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    useEffect(() => {
        const results = posts.filter(post =>
            post.fullName.toLowerCase().includes(search.fullName.toLowerCase()) &&
            post.title_post.toLowerCase().includes(search.titlePost.toLowerCase()) &&
            post.date_post.slice(0, 10).includes(search.datePost)
        );
        setResults(results);
    }, [search, posts]);

    return (
        <>
            <div className={style.container}>
                <h1>Post</h1>
                <div className={style.search}>
                    <input type={"text"} placeholder={"Enter name of user"} className={style.fullName}
                           onChange={e => setSearch({...search, fullName: e.target.value})}/><br/>
                    <input type={"text"} placeholder={"Enter title post"}
                           onChange={e => setSearch({...search, titlePost: e.target.value})}
                           className={style.searchContent}/>
                    <input type={"date"} onChange={e => setSearch({...search, datePost: e.target.value})}
                           className={style.date}/>
                </div>
                <div className={style.listCard}>
                    {
                        results?.map((data, index) => (
                            <div key={index} className={style.card}>
                                <div className={style.head}>
                                    <div className={`${style.coating} coating`}
                                         onClick={() => navigate('/admin/detailPost', {state: {idPost: data.id_post}})}>
                                        {data.title_post}
                                    </div>
                                    <img alt={"illustration"}
                                         src={data.illustration_post}/>
                                </div>
                                <div className={style.tail}>
                                    <div className={style.boxAvatar}>
                                        <img alt={"img"}
                                             src={data.avatar}/>
                                    </div>
                                    <div className={style.boxInfo}>
                                        <div className={style.username}>
                                            {data.fullName}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}