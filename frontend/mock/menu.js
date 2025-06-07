export default [
    {
        url: '/api/getMenuItems',
        method: 'get',
        response: () => {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            id: 1,
                            name: '首页',
                            path: '/home',
                            icon: 'HomeFilled'
                        },
                        {
                            id: 2,
                            name: '文章',
                            path: '/posts',
                            icon: 'edit'
                        },
                        {
                            id: 3,
                            name: '归档',
                            path: '/archives',
                            icon: 'MessageBox'
                        },

                        {
                            id: 4,
                            name: '标签',
                            path: '/tags',
                            icon: 'PriceTag'
                        },
                        {
                            id: 5,
                            name: '关于',
                            path: '/about',
                            icon: 'Avatar'
                        },

                    ]
                }
            }
        }
    }
]