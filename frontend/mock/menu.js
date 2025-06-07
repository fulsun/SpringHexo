export default [
    {
        url: '/api/getMenu',
        method: 'get',
        response: () => {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            name: '首页',
                            path: '/home',
                            icon: 'home'
                        },
                        {
                            name: '文章',
                            path: '/posts',
                            icon: 'edit'
                        },
                        {
                            name: '归档',
                            path: '/archives',
                            icon: 'archive'
                        },

                        {
                            name: '标签',
                            path: '/tags',
                            icon: 'tag'
                        },
                        {
                            name: '关于',
                            path: '/about',
                            icon: 'info'
                        },

                    ]
                }
            }
        }
    }
]