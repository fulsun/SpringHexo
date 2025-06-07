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
                        username: "admin"
                    }
                },
                message: '登录成功'
            }
        }
    }
]