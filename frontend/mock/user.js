export default [
    {
        url: '/api/login',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {
                    token: 'xxxxx',
                    userInfo: {
                        username: "admin",
                        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
                    }
                },
                message: '登录成功'
            }
        }
    }
]