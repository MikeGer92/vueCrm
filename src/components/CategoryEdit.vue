<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitEdit">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >
            {{ c.title }}
            </option>
          </select>
          <label></label>
        </div>

        <div class="input-field">
          <input 
            type="text" 
            id="name"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          >
          <label for="name">Название</label>
          <span 
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          >
          <label for="limit">Лимит</label>
          <span 
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальное значение расходов {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue} from 'vuelidate/lib/validators'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      select: null,
      title: '',
      limit: 100,
      current: null
    }
  },
    validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  watch: {
    current(catId) {
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title,
      this.limit = limit
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id,
    this.title = title,
    this.limit = limit
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select)
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy
    }
  },
  methods: {
    async submitEdit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          title: this.title,
          limit: this.limit,
          id: this.current
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.title = ''
        this.limit = 100
        this.$v.$reset()
        this.$message(`Категория ${categoryData.title} успешно отредактирована`)
        this.$emit('updated', categoryData)
      } catch (e) {console.log(e)}
    }
  }
}
</script>