import request from '@/utils/request'


// 注册方法
export function listFilm(data) {
    return request({
        url: '/listFilm',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

