import request from '@/utils/request'
import qs from 'qs'
export function search(page, size, data) {
  return request({
    url: '/SpringResource/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringResource/Detail?id=' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/SpringResource/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringResource/Edit/',
    method: 'put',
    data
  })
}

export function batchDelete(data) {
  data = qs.stringify({
    'ids': data
  }, {
    indices: false
  })
  return request({
    url: '/SpringResource/SetDeleted',
    method: 'post',
    data
  })
}

export function listAllSystem() {
  return request({
    url: '/SpringSystem/ListAll',
    method: 'get'
  })
}

export function ListAllToTree(systemCode) {
  return request({
    url: '/SpringResource/ListAllToTableTree?systemCode=' + systemCode,
    method: 'get'
  })
}
