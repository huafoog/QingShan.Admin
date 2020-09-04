<template>
  <div class="app-container">
    <section>
      <el-header ref="header" height="70">
        <el-form ref="headerrow" size="medium" :inline="true">
          <el-form-item label="关键字：">
            <el-input v-model="filters.search" placeholder="请输入姓名/账号" style="width:200px;" clearable />
          </el-form-item>
          <el-form-item>
            <template>
              <el-button type="primary" icon="el-icon-search" size="medium" @click="search">查询</el-button>
            </template>
          </el-form-item>
          <el-button type="success" icon="el-icon-plus" size="medium" @click="add">新增</el-button>
        </el-form>
      </el-header>
      <commonTable
        :columns="columns"
        :data="tableData"
        :pager="pageInfo"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <el-table-column slot="table_oper" align="center" label="操作" width="150" fixed="right" :resizable="false">
          <template slot-scope="scope">
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              size="mini"
              @click="editTableData(scope.row)"
            >编辑</el-button>
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              size="mini"
              type="danger"
              @click="editTableData(scope.row)"
            >删除</el-button>
            <!-- <el-button v-loading.fullscreen.lock="fullscreenLoading" type="text" size="small" @click="editTableData(scope.row)">修改</el-button> -->
          </template>
        </el-table-column>
      </commonTable>
    </section>
    <el-drawer
      ref="drawer"
      :title="title"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
    >
      <div>
        <el-container>
          <el-main>
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
          </el-main>
          <el-footer>
            <el-button style="float:right;margin-left:20px" type="primary" :loading="loading" @click="sumbit">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
            <el-button style="float:right" @click="cancelForm">取 消</el-button>
          </el-footer>
        </el-container>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { GetUserPage, GetUserInfo, Add } from '@/api/Admin/User'
export default {
  data() {
    return {
      headerHeight: 70,
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
        search: ''
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
      GetUserPage({ ...this.pageInfo, ...this.filters }).then(res => {
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
    search() {
      this.init()
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

