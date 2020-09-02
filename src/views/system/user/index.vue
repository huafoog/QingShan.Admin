<template>
  <div class="app-container">
    <section>
      <!--工具条-->
      <el-col :span="24" class="el-table_headtoolbar" style="padding-top: 0px;">
        <el-form :inline="true" :model="filters" class="userform" label-width="50px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="filters.name" placeholder="姓名" prefix-icon="el-icon-search" />
          </el-form-item>
        </el-form>
        <el-button @click="add">新增用户</el-button>
      </el-col>
      <template>
        <div>
          <commonTable
            :columns="columns"
            :data="tableData"
            :pager="pageInfo"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
          >
            <el-table-column slot="table_oper" align="center" label="操作" width="150" fixed="right" :resizable="false">
              <template slot-scope="scope">
                <el-button v-loading.fullscreen.lock="fullscreenLoading" type="text" size="small" @click="editTableData(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </commonTable>
        </div>
      </template>
    </section>
    <el-drawer
      ref="drawer"
      :title="title"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="el-drawer"
    >
      <div class="el-drawer__content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.nickName" />
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="form.userName" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" />
          </el-form-item>
        </el-form>
        <div class="el-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="sumbit">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { GetUserPage, GetUserInfo, Add } from '@/api/Admin/User'
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      fullscreenLoading: false,
      columns: [
        { prop: 'id', label: '序号', width: '150', align: 'left' },
        { prop: 'nickName', label: '姓名', width: '200', align: 'center' },
        { prop: 'userName', label: '账号', align: 'center' },
        { prop: 'status', label: '账号状态', align: 'center' },
        { prop: 'createdTime', label: '创建日期', align: 'center' }
      ],
      tableData: [],
      filters: {
        name: '',
        sex: ''
      },
      pageInfo: {
        pageSize: 10,
        pageIndex: 1,
        sizes: [10, 50, 100],
        total: 0
      },
      form: {
        nickName: '',
        userName: '',
        password: ''
      },
      formLabelWidth: '80px',
      title: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      GetUserPage({ ...this.pageInfo }).then(res => {
        this.tableData = res.data
        this.pageInfo.total = res.total
      })
      // this.tableData = data.data
    },
    // 重新渲染name列
    formatter(row, column, cellValue) {
      return row.name
    },
    // 改变页面大小处理
    handleSizeChange(val) {

    },
    // 翻页处理
    handleCurrentChange(val) {

    },
    formatSex: function(row, column, cellValue, index) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知'
    },
    // 状态改成汉字
    formatterColumn(row, column) {
      switch (row.IsAudit) {
        case 0:
          return '未通过'
        case 1:
          return '审核通过'
        case 10:
          return '待审核'
        case 9:
          return '草稿'
        default:
          return '未知'
      }
    },
    handleClose(done) {
      if (this.loading) {
        return
      }
      done()
      // this.$confirm('确定要提交表单吗？')
      //   .then(_ => {
      //     this.loading = false
      //     done()
      //   })
      //   .catch(_ => {})
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
    },
    add() {
      this.dialog = true
      this.title = '新增用户'
    },
    editTableData(row) {
      this.fullscreenLoading = true
      GetUserInfo({ id: row.id }).then(res => {
        this.fullscreenLoading = false
        this.form.nickName = res.data.nickName
        this.form.userName = res.data.userName
        this.dialog = true
        this.title = '修改用户'
      })
    },
    async sumbit() {
      this.loading = true
      await Add({ ...this.form }).then(res => {
        this.loading = false
        this.init()
        this.dialog = false
        this.$notify({
          title: '提示',
          message: '操作成功',
          type: 'success'
        })
        this.clern()
      }).catch(() => {
        this.loading = false
      })
    },
    clern() {
      const form = this.form
      Object.keys(form).forEach(key => (form[key] = ''))
    }
  }
}
</script>

