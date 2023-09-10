import LayoutDefault from "./component/layout/default";
import ExploreProjectChild from "./component/children/explore projects/ExploreProjectChild";
import DefaultChild from "./component/children/default/DefaultChild";
import OnlyNavbar from "./component/layout/only navbar";
import Member from "./component/children/member/Member";
import Post from "./component/children/post/Post";
import {Fragment} from "react";
import Login from "./component/layout/login";
import Register from "./component/layout/register";
import Register1 from "./component/children/register/child1/Register1";
import Register2 from "./component/children/register/child2/Register2";
import Register3 from "./component/children/register/child3/Register3";
import Register4 from "./component/children/register/child4/Register4";
import PostProjectStage1 from "./component/children/post project/stage1/PostProjectStage1";
import PostProjectStage2 from "./component/children/post project/stage2/PostProjectStage2";
import HowToChild from "./component/children/how to/HowToChild";
import SettingChild from "./component/children/setting/SettingChild";
import Setting from "./component/layout/setting";

let publicRoutes = [
    {path: '/', component: DefaultChild, layout: LayoutDefault},
    {path: '/diy/:exploreProject', component: ExploreProjectChild, layout: OnlyNavbar},
    {path: '/member/:nameMember', component: Member, layout: OnlyNavbar},
    {path: '/diy/:nameProject/:namePost', component: Post, layout: OnlyNavbar},
    {path: '/login', component: Fragment, layout: Login},
    {path: '/register/email', component: Register1, layout: Register},
    {path: '/register/birthDay', component: Register2, layout: Register},
    {path: '/register/username', component: Register3, layout: Register},
    {path: '/register/password', component: Register4, layout: Register},
    {path: '/postProject/stage1', component: PostProjectStage1, layout: OnlyNavbar},
    {path: '/postProject/stage2', component: PostProjectStage2, layout: OnlyNavbar},
    {path: '/diy/howTo/:name', component: HowToChild, layout: OnlyNavbar},
]
let privateRoutes = [
    {path: '/', component: DefaultChild, layout: LayoutDefault},
    {path: '/diy/:nameProject/:namePost', component: Post, layout: OnlyNavbar},
    {path: '/member/:nameMember', component: Member, layout: OnlyNavbar},
    {path: '/setting', component: SettingChild, layout: Setting},
    {path: '/postProject/stage1', component: PostProjectStage1, layout: OnlyNavbar},
    {path: '/postProject/stage2', component: PostProjectStage2, layout: OnlyNavbar},
    {path: '/diy/:exploreProject', component: ExploreProjectChild, layout: OnlyNavbar},
    {path: '/diy/howTo/:name', component: HowToChild, layout: OnlyNavbar},
]

export {publicRoutes, privateRoutes}