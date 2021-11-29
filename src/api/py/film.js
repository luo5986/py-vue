import request from '@/utils/request'


export function listFilm(data) {
    return request({
        url: '/listFilm',
        method: 'get',
        data: data
    })
}

export function listType(data) {
    return request({
        url: '/listType',
        method: 'get',
        data: data
    })
}

export function listLast(data) {
    return request({
        url: '/last',
        method: 'get',
        data: data
    })
}

