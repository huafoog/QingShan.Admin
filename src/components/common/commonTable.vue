<template>
  <div id="commonTable">
    <el-table :data="data" :max-height="maxHeight" stripe tooltip-effect="light" @selection-change="handleSelectionChange">
      <slot name="table_oper" />
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="item.show != false"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align?item.align:'center'"
          :width="item.width"
          :formatter="item.formatter?item.formatter : formatterValue"
        />
      </template>
    </el-table>
    <el-pagination
      style="text-align: center;margin:20px 0;"
      :current-page="pager.pageIndex"
      :page-size="pager.pageSize"
      :page-sizes="pager.sizes"
      :total="pager.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    columns: Array,
    data: Array,
    pager: Object,
    maxHeight: {
      type: Number,
      default: 2000
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    formatterValue(row, column, cellValue) {
      return cellValue
    }
  }
}
</script>
