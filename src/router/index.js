import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: 'Posts'
    },
    {
      path: '/post/add',
      name: 'AddPost',
      component: (resolve) => require(['../components/addPost.vue'], resolve)
    },
    {
      path: '/post/edit/:id',
      name: 'EditPost',
      component: (resolve) => require(['../components/EditPost.vue'], resolve)
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: (resolve) => require(['../components/Post.vue'], resolve)
    },
    {
      path: '/posts',
      name: 'Posts',
      component: (resolve) => require(['../components/Posts.vue'], resolve)
    },
    {
      path: '/register',
      name: 'Register',
      component: (resolve) => require(['../components/Register.vue'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/setting',
      name: 'Setting',
      component: (resolve) => require(['../components/Setting.vue'], resolve)
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: (resolve) => require(['../components/Profile.vue'], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem('token') || sessionStorage.getItem('token') === 'null') {
    if (to.name === 'Setting' || to.name === 'AddPost' || to.name === 'EditPost') {
      return next({name: 'Login'})
    }
    next()
  } else {
    if (to.name === 'Login' || to.name === 'Register') {
      return next({name: 'Posts'})
    }
    next()
  }
})

export default router
