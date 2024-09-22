import { createRouter, createWebHistory } from "vue-router";


import Home from "@/views/Home.vue";
import Analysis from "@/views/03-analysis/Analysis.vue";
import AddNotiPage from "@/views/05-notification/AddNotiPage.vue";
import EditNotiPage from "@/views/05-notification/EditNotiPage.vue";
import ShowNotiPage from "@/views/05-notification/ShowNotiPage.vue";
import Activities from "@/views/02-activities/Activities.vue";
import Users from "@/views/01-user/Users.vue";
import Login from "@/views/01-user/Login.vue"
import Register from "@/views/01-user/Register.vue";
import Update from "@/views/01-user/Update.vue";
import MyProfile from "@/views/01-user/MyProfile.vue";
import Account from "@/views/01-user/Account.vue";
import UpdatePwd from "@/views/01-user/UpdatePwd.vue";
import UserReportsList from "@/views/06-report/UserReportsList.vue";
import ActivityReportsList from "@/views/06-report/ActivityReportsList.vue";
import CommentReportsList from "@/views/06-report/CommentReportsList.vue";
import AllReportsList from "@/views/06-report/AllReportsList.vue";
import LoginIndex from "@/views/LoginIndex.vue";


const routes = [
    {name:"home-link", path:"/", component: Home},
    {name:"loginIndex-link", path:"/loginIndex", component: LoginIndex},
    {name:"analysis-link", path:"/analysis", component: Analysis},
    {name:"addNotiPage-link", path:"/notification/add", component: AddNotiPage},
    {name:"editNotiPage-link", path:"/notification/update/:id", component: EditNotiPage},
    {name:"showNotiPage-link", path:"/notification/list", component: ShowNotiPage},
    {name:"activities-link", path:"/", component: Activities},
    {name:"users-link", path:"/users", component: Users},
    {name:"login-link", path:"/login", component: Login},
    {name:"register-link", path:"/register", component: Register},
    {name:"myprofile-link", path:"/myprofile", component: MyProfile},
    {name:"update-link", path:"/update", component: Update},
    {name:"account-link", path:"/account", component: Account},
    {name:"updatePwd-link", path:"/updatePwd", component: UpdatePwd},
    {name:"userReportsList-link", path:"/report/list/users", component: UserReportsList},
    {name:"activityReportsList-link", path:"/report/list/activities", component: ActivityReportsList},
    {name:"commentReportsList-link", path:"/report/list/actComments", component: CommentReportsList},
    {name:"allReportsList-link", path:"/report/list", component: AllReportsList},

]


const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router