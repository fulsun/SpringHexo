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
                            title: '首页',
                            path: '/home',
                            icon: 'mdi-light:home',
                            // 固定标签
                            isFixed: true,
                        },
                        {
                            id: 2,
                            title: '文章',
                            path: '/posts',
                            icon: 'material-symbols:edit-note'
                        },
                        {
                            id: 3,
                            title: '归档',
                            path: '/archives',
                            icon: 'ion:library-outline'
                        },

                        {
                            id: 4,
                            title: '标签',
                            path: '/tags',
                            icon: 'tdesign:tag'
                        },
                        {
                            id: 5,
                            title: '关于',
                            path: '/about',
                            icon: 'icon-park-outline:avatar'
                        },
                        {
                            id: 6,
                            title: '系统设置',
                            path: '/settings',
                            icon: 'mdi-light:settings',
                            children: [
                                {
                                    id: 7,
                                    title: '导入文章',
                                    path: '/settings/importPost',
                                    icon: 'mdi:import'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
]