import LayoutDefault from "./component/layout/USER/default";
import ExploreProjectChild from "./component/children/USER/explore projects/ExploreProjectChild";
import DefaultChild from "./component/children/USER/default/DefaultChild";
import OnlyNavbar from "./component/layout/USER/only navbar";

import Member from "./component/children/USER/member/Member";
import Post from "./component/children/USER/post/Post";
import {Fragment} from "react";
import Login from "./component/layout/USER/login";
import Register from "./component/layout/USER/register";
import Register1 from "./component/children/USER/register/child1/Register1";
import Register2 from "./component/children/USER/register/child2/Register2";
import Register3 from "./component/children/USER/register/child3/Register3";
import Register4 from "./component/children/USER/register/child4/Register4";
import PostProjectStage1 from "./component/children/USER/post project/stage1/PostProjectStage1";
import PostProjectStage2 from "./component/children/USER/post project/stage2/PostProjectStage2";
import HowToChild from "./component/children/USER/how to/HowToChild";
import SettingChild from "./component/children/USER/setting/SettingChild";
import Setting from "./component/layout/USER/setting";
import Temp from "./component/temp/Temp";
import Search from "./component/children/USER/search/Search";
import EditPostStage1 from "./component/children/USER/edit post/stage1/EditPostStage1";
import EditPostStage2 from "./component/children/USER/edit post/stage2/EditPostStage2";
import OnlyPost from "./component/layout/USER/post";
import CommentsChild from "./component/children/USER/comments/CommentsChild";
import AdminLogin from "./component/layout/ADMIN/login";
import UserChild from "./component/children/ADMIN/user/list users/UserChild";
import DefaultAdmin from "./component/layout/ADMIN/default";
import HomeChild from "./component/children/ADMIN/home/HomeChild";
import ViewUserChild from "./component/children/ADMIN/user/view user/ViewUserChild";
import ProjectsChild from "./component/children/ADMIN/projects/ProjectsChild";
import CategoriesChild from "./component/children/ADMIN/categories/CategoriesChild";
import PostsChild from "./component/children/ADMIN/post/list post/PostsChild";
import DetailPostChild from "./component/children/ADMIN/post/detail post/DetailPostChild";
import RankChild from "./component/children/ADMIN/chart/rank/RankChild";
import LineChild from "./component/children/ADMIN/chart/line/LineChild";

let publicRoutes = [
    {path: '/', component: DefaultChild, layout: LayoutDefault},
    {path: '/diy/:exploreProject', component: ExploreProjectChild, layout: OnlyNavbar},
    {path: '/member/:nameMember', component: Member, layout: OnlyNavbar},
    {path: '/checkPost/:nameProject/:namePost', component: Post, layout: OnlyNavbar},
    {path: '/login', component: Fragment, layout: Login},
    {path: '/register/email', component: Register1, layout: Register},
    {path: '/register/birthDay', component: Register2, layout: Register},
    {path: '/register/username', component: Register3, layout: Register},
    {path: '/register/password', component: Register4, layout: Register},
    {path: '/postProject/stage1', component: PostProjectStage1, layout: OnlyNavbar},
    {path: '/postProject/stage2', component: PostProjectStage2, layout: OnlyNavbar},
    {path: '/diy/howTo/:name', component: HowToChild, layout: OnlyNavbar},
    {path: '/temp', component: Fragment, layout: Temp},
    {path: '/diy/:nameProject/:namePost', component: CommentsChild, layout: OnlyPost},
    {path: '/search', component: Search, layout: OnlyNavbar},
]
let privateRoutes = [
    {path: '/', component: DefaultChild, layout: LayoutDefault},
    {path: '/checkPost/:nameProject/:namePost', component: Post, layout: OnlyNavbar},
    {path: '/member/:nameMember', component: Member, layout: OnlyNavbar},
    {path: '/setting', component: SettingChild, layout: Setting},
    {path: '/postProject/stage1', component: PostProjectStage1, layout: OnlyNavbar},
    {path: '/postProject/stage2', component: PostProjectStage2, layout: OnlyNavbar},
    {path: '/diy/:exploreProject', component: ExploreProjectChild, layout: OnlyNavbar},
    {path: '/diy/howTo/:name', component: HowToChild, layout: OnlyNavbar},
    {path: '/search', component: Search, layout: OnlyNavbar},
    {path: '/editPost/stage1', component: EditPostStage1, layout: OnlyNavbar},
    {path: '/editPost/stage2', component: EditPostStage2, layout: OnlyNavbar},
    {path: '/temp', component: Fragment, layout: Temp},
    {path: '/diy/:nameProject/:namePost', component: CommentsChild, layout: OnlyPost}
]

let publicRoutesAdmin = [
    {path: '/admin', component: Fragment, layout: AdminLogin}
]

let privateRoutesAdmin = [
    {path: '/admin', component: HomeChild, layout: DefaultAdmin},
    {path: '/admin/user', component: UserChild, layout: DefaultAdmin},
    {path: '/admin/user/:nameUser', component: ViewUserChild, layout: DefaultAdmin},
    {path: '/admin/projects', component: ProjectsChild, layout: DefaultAdmin},
    {path: '/admin/categories', component: CategoriesChild, layout: DefaultAdmin},
    {path: '/admin/posts', component: PostsChild, layout: DefaultAdmin},
    {path: '/admin/detailPost', component: DetailPostChild, layout: DefaultAdmin},
    {path: '/admin/rank', component: RankChild, layout: DefaultAdmin},
    {path: '/admin/line', component: LineChild, layout: DefaultAdmin},
]
export {publicRoutes, privateRoutes, publicRoutesAdmin,privateRoutesAdmin}