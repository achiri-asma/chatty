import {createRouter,createWebHistory} from 'vue-router'
import HomePage from './pages/HomePage.vue'


const routes = [

    {path:'/',component:HomePage,name:'HomePage'},
]
const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router
