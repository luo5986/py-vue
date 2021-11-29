import request from '@/utils/request'


export function getCenterOne(data) {
    return request({
        url: '/centerOne',
        headers: {
            isToken: false
        },
        method: 'get',
        data: data
    })
}

export function getCenterTwo(data) {
    return request({
        url: '/centerTwo',
        method: 'get',
        data: data
    })
}

export function getLeftOne(data) {
    return request({
        url: '/leftOne',
        method: 'get',
        data: data
    })
}

export function getLeftTwo(data) {
    return request({
        url: '/leftTwo',
        method: 'get',
        data: data
    })
}

export function getRightOne(data) {
    return request({
        url: '/rightOne',
        method: 'get',
        data: data
    })
}

export function getRightTwo(data) {
    return request({
        url: '/rightTwo',
        method: 'get',
        data: data
    })
}
