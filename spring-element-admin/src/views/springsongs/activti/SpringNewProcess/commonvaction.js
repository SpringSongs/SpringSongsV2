import {
  search,
  save,
  submitSpringActVacation,
  listSpringDictionaryDetailByDictionaryCode,
  batchDelete
} from '@/api/springsongs/activiti/SpringNewProcess/commonvaction'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      springDictionaryDetailList: [],
      searchForm: {
        size: 20,
        page: 0,
        total: 0
      },
      dialogAddVisible: false,
      addForm: {
        time: 1
      },
      addFormRules: {
        vacationType: [{
          required: true,
          message: '请选择分类',
          trigger: 'blur'
        }],
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        reason: [{
          required: true,
          message: '请输入请假申请原因',
          trigger: 'blur'
        }],
        time: [{
          required: true,
          message: '请输入请假天数',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    sizeChangeHandle(val) {
      this.searchForm.size = val
      this.searchForm.page = 0
      this.handleSearch()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      this.searchForm.currPage = val
      this.handleSearch()
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 查询
    handleSearch: function() {
      const self = this
      search(self.searchForm.page, self.searchForm.size, self.searchForm).then(
        function(response) {
          self.tableData = response.data
          self.searchForm.total = response.count
          self.loading = false
        }
      )
    },
    // 显示新增界面
    handleAdd: function() {
      this.handleListSpringDictionaryDetailByDictionaryCode()
      this.dialogAddVisible = true
    },
    // 保存
    handleSave: function(formName) {
      console.log(formName)
      const {
        key
      } = this.$route.query
      this.addForm.procDefKey = key
      if (this.addForm.startEndTime) {
        this.addForm.startTime = this.addForm.startEndTime[0]
        this.addForm.endTime = this.addForm.startEndTime[1]
      }
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          save(this.addForm).then((res) => {
            self.$message.success(res.msg)
            self.handleSearch()
            self.dialogAddVisible = false
          })
        } else {
          this.$message.error('请填写必填项')
        }
      })
    },
    handleListSpringDictionaryDetailByDictionaryCode() {
      const self = this
      listSpringDictionaryDetailByDictionaryCode('vacation').then(res => {
        self.springDictionaryDetailList = res.data
      })
    },
    handleSubmit() {
      const self = this
      if (self.multipleSelection.length === 0) {
        self.$message.warning('请选择提交项目')
      } else if (self.multipleSelection.length > 1) {
        self.$message.warning('只允许提交一项项目')
      } else {
        submitSpringActVacation(self.multipleSelection[0]).then((res) => {
          self.$message.success(res.msg)
        })
      }
    },
    handleDel: function() {
      debugger
      const self = this
      const ids = []
      if (self.multipleSelection.length === 0) {
        self.$message.warning('请选择删除项目')
        return
      } else if (self.multipleSelection.length > 1) {
        self.$message.warning('只允许删除一个项目')
        return
      }
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        self.multipleSelection.map((item) => {
          ids.push(item.id)
        })
        console.log(ids)
        batchDelete(ids).then(res => {
          self.$message.success(res.msg)
          self.handleSearch()
        })
      }).catch(() => {})
    },
    // 上传
    // 关装对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}