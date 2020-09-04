<template>
  <div class="app-container">
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
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="action_url"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.avatar" :src="fileUrl+form.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button style="float:right;margin-left:20px" type="primary" :loading="loading" @click="sumbit">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Update, GetUserInfo } from '@/api/Admin/User'
import { getUserInfo, setUserInfo } from '@/utils/cache'
import { fileUrl } from '@/utils/config'
export default {
  data() {
    return {
      loading: false,
      action_url: process.env.VUE_APP_BASE_API + 'api/Upload/UploadFile',
      imageUrl: '',
      fileUrl: fileUrl,
      form: {
        id: '',
        nickName: '',
        userName: '',
        password: '',

        /**
         * 头像
         */
        avatar: ''
      }
    }
  },
  created() {
    this.GetData()
  },
  methods: {
    GetData() {
      const user = getUserInfo()
      this.form.id = user.id
    },
    async sumbit() {
      await Update({ ...this.form })
    },
    cancelForm() {

    },
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
