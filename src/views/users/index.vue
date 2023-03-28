import useGetUserData from '../../../.history/src/views/users/composables/useGetUserData_20230326162727';
<template>
  <div>
    <div class="mb-3">
      <button type="button" class="btn btn-primary px-3" @click="openModal('add')">
        <i class="fas fa-plus"></i>新增
      </button>
    </div>
    <div style="height: 460px;overflow: scroll;margin-bottom: 20px;">
      <table class="table table-bordered table-hover table-striped" style="height: 50vh">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">用户名</th>
            <th scope="col">角色</th>
            <th scope="col">性别</th>
            <th scope="col">头像</th>
            <th scope="col">地址</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in lists" :key="item.id.toString()">
            <th scope="row">{{ (index + 1) }}</th>
            <td>{{ item.username }}</td>
            <td>{{ item.roles.map(o => o.name).join(',') }}</td>
            <td>{{ item.profile && item.profile.gender }}</td>
            <td>{{ item.profile && item.profile.photo }}</td>
            <td>{{ item.profile && item.profile.address }}</td>
            <td>
              <button type="button" class="btn btn-secondary px-3" @click="openModal('edit', item)">
                <i class="far fa-edit me-2"></i>编辑</button>
              <button type="button" class="btn btn-danger px-3 ms-3" @click="openModal('delete', item)">
                <i class="far fa-trash-alt me-2"></i>删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 分页组件,先通过数据库查询有多少条数据,然后v-for -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>

    <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#DeleteModal">
      Launch demo modal
              </button> -->

    <!-- Edit/Add Form Model -->
    <div class="modal fade" ref="editRef" tabindex="-1" aria-labelledby="EditAndAddModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="EditAndAddModalLabel">{{ msg }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- username input -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">用户名</label>
              <input type="username" class="form-control" id="exampleFormControlInput1" placeholder="请输入用户名"
                v-model="formValue.username">
            </div>
            <!-- password input -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">密码</label>
              <input type="username" class="form-control" id="exampleFormControlInput2" placeholder="请输入登录密码"
                v-model="formValue.password">
            </div>
            <!-- role checkbox -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">角色</label>
              <div class="form-control border-0">

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" :value="{ id: 1, name: 'admin' }" id="flexCheckChecked"
                    v-model="formValue.roles" :checked="formValue.roles.some(o => o.id == 1)">
                  <label class="form-check-label" for="flexCheckChecked">
                    管理员
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" :value="{ id: 2, name: 'user' }" id="flexCheckChecked2"
                    v-model="formValue.roles" :checked="formValue.roles.some(o => o.id == 2)">
                  <label class="form-check-label" for="flexCheckChecked2">
                    用户
                  </label>
                </div>


                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" :value="{ id: 3, name: 'customer' }"
                    id="flexCheckChecked3" v-model="formValue.roles"
                    :checked="formValue.roles.some(item => item.id === 3)">
                  <label class="form-check-label" for="flexCheckChecked3">
                    顾客
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" :value="{ id: 4, name: 'tour' }" id="flexCheckChecked4"
                    v-model="formValue.roles" :checked="formValue.roles.some(item => item.id === 4)">
                  <label class="form-check-label" for="flexCheckChecked4">
                    游客
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" :value="{ id: 5, name: 'student' }"
                    id="flexCheckChecked5" v-model="formValue.roles"
                    :checked="formValue.roles.some(item => item.id === 5)">
                  <label class="form-check-label" for="flexCheckChecked5">
                    学生
                  </label>
                </div>
              </div>
            </div>
            <!-- gender radio -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">性别</label>
              <div class="form-control border-0">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" :value="1"
                    v-model="formValue.profile.gender">
                  <label class="form-check-label" for="flexRadioDefault1">
                    男
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" :value="0"
                    v-model="formValue.profile.gender">
                  <label class="form-check-label" for="flexRadioDefault2">
                    女
                  </label>
                </div>
              </div>
            </div>

            <!-- avatar input/upload button -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">用户头像</label>
              <input type="username" class="form-control" id="exampleFormControlInput1" placeholder="请粘贴头像路径"
                v-model="formValue.profile.photo">
            </div>
            <!-- address input -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">地址</label>
              <input type="username" class="form-control" id="exampleFormControlInput1" placeholder="请输入地址"
                v-model="formValue.profile.address">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="editSubmit()">确定</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal fade" ref="deleteRef" tabindex="-1" aria-labelledby="DeleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="DeleteModalLabel">删除</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            确定删除该记录吗？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="deleteSubmit()">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGetUserData } from './composables/useGetUserData'
const { formValue,
  deleteRef,
  editRef,
  lists,
  openModal,
  msg,
  editSubmit,
  deleteSubmit } = useGetUserData();

</script>

<style scoped></style>