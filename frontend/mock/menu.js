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
                            icon: 'home'
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
                            icon: 'archives'
                        },

                        {
                            id: 4,
                            name: '标签',
                            path: '/tags',
                            icon: 'tag'
                        },
                        {
                            id: 5,
                            name: '关于',
                            path: '/about',
                            icon: 'avatar'
                        },
                        {
                            id: 6,
                            name: '系统设置',
                            path: '/settings',
                            icon: 'settings',
                            children: [
                                {
                                    id: 7,
                                    name: '导入文章',
                                    path: '/settings/importPost',
                                    icon: 'import'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
]