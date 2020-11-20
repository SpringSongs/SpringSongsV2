import request from '@/utils/request'
import qs from 'qs'
export function search(data) {
  return request({
    url: '/SpringOrganization/ListByPage',
    method: 'post',
    data
  })
}

export function listAllToTree() {
  return request({
    url: '/SpringOrganization/ListAllToTree',
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: '/SpringOrganization/Detail?id=' + id,
    method: 'post'
  })
}

export function save(data) {
  return request({
    url: '/SpringOrganization/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringOrganization/Edit',
    method: 'post',
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
    url: '/SpringOrganization/SetDeleted',
    method: 'post',
    data
  })
}

export function listOrganizationsByParent(parentId) {
  parentId = qs.stringify({
    'parentId': parentId
  })
  return request({
    url: '/SpringOrganization/listOrganizationsByParent',
    method: 'get',
    parentId
  })
}