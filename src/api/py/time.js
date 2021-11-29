import request from '@/utils/request'


// 注册方法
export function getTime(data) {
    return request({
        url: '/time',
        headers: {
            isToken: false
        },
        method: 'get',
        data: data
    })
}

