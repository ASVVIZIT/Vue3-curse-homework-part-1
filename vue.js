// вы можете как угодно изменять программу и код
// добавлять любые переменные и модели
// ваша задача реализовать так, как показано на видео, чтобы оно работало
// Vue 3 Курсовая 1 - курс от владилена
const AppMeta = {
    data() {
        return {
            titleHeader: 'Основы Vue',
        }
    }
}
Vue.createApp(AppMeta).mount('#meta')

const App = {
    data() {
        return {
            activeIndex: 0, // то, что позволяет определить текущий активный шаг
            titleApp: 'План по изучению Vue.js',
            titleAppDebug: 'Панель отладки',
            chapterSteps: 'Глава',
            nextOfFinishMode: 'Next',
            statusComponent: 'Learning',
            btnNewLearning: {
                btnText: 'Начать заново',
                btnTitle: 'Пройти обучение заново?'
            },
            btnNextOfFinish: {
                btnDefault: {
                    btnText: 'Вперед',
                    btnTitle: 'Перейти на шаг Вперёд.'
                },
                btnFinish: {
                    btnText: 'Закончить',
                    btnTitle: 'Закончить план по изучению.'
                }
            },
            btnPrev: {
                btnText: 'Назад',
                btnTitle: 'Перейти на шаг Назад.'
            },
            btnReset: {
                btnText: 'Начать заново',
                btnTitle: 'Перейти на шаг Вперёд'
            },
            classStep: {
                done: 'done',
                active: 'active'
            },
            steps: [
                {
                    title: 'Основы',
                    text: 'В блоке вы познакомитесь со всеми основами Vue.js на практике. На протяжении блока мы напишем реактивное приложение, в процессе разработки которого разберем вся базу фреймворка.'
                },
                {
                    title: 'Компоненты',
                    text: 'Один из самых важных блоков в курсе, где вы узнаете все о компонентах. В блоке мы напишем 2 разных приложения и создадим более 5 различных UI компонентов как в реальной разработке. Блок расскажет про абсолютно все составляющие, которые есть в компонентах: взаимодействие, slots, асинхронные и динамические компоненты и тонна примеров.'
                },
                {
                    title: 'Роутер',
                    text: 'В данном блоке вы узнаете все о том, как работает мультиязычность во Vue. Мы создадим миниклон Gmail в данном блоке, где вы на практике увидите как работать с динамическим роутером.'
                },
                {
                  title: 'пусто',
                },
                {
                    title: 'Vuex',
                    text: 'В блоке вы узнаете абсолютно все про Vuex. Вы узнаете как работать с данными, какие есть лучшие практики по их программированию и структурированию. Все на практике.'
                },
                {
                    title: 'Composition',
                    text: 'Одним из наиболее важных обновлений в Vue 3 является появление альтернативного синтаксиса Composition API. В этом блоке вы узнаете все, чтобы полностью пользоваться данными синтаксисом на практических примерах. Помимо этого вы узнаете как работать совместно с Vue Router и Vuex.'
                },
                {
                  title: 'Финиш',
                }
            ],
            emptyStep: 'На данном шаге не указана информация, обратитесь к администратору',
            titleStep: '',
            textStep: '',
            stepsSelected: [],
            stepsSelectedStringify: [],
            replacerText: null,
            spaceText: ' '
        }
    },
    created() {
        console.log('create')
        this.create()
    },
    updated() {
        console.log('updated')
        this.selectStepMapStringify(this.stepsSelected)
    },
    methods: {
        create() {
            // Сброс приложения при создании
            this.reset()
            this.selectStepMapStringify(this.stepsSelected)
        },
        reset() {
            // начать заново
            this.selectedFirstSteps()
        },
        selectedFirstSteps() {
            this.stepsSelected = this.steps.slice(this.selectStep, this.selectStep + 1)
            this.setSteps(this.selectStep, this.steps[this.selectStep])
        },
        prev() {
            // когда нажимаем кнопку назад
            if (this.selectStep !== 0) {
                this.activeIndex--
                this.selectStepSliceElements(this.selectStep, this.steps[this.selectStep])
                this.setSteps(this.selectStep, this.steps[this.selectStep])
            }
        },
        nextOfFinish() {
            // кнопка вперед или закончить
            if (this.statusComponent === 'Learning') {
                if (this.nextOfFinishMode === 'Next') {
                    if ((this.selectStep !== this.steps.length - 1) && (this.stepsSelected.length < this.steps.length)) {
                        this.activeIndex++
                        this.statusComponent = 'Learning'
                        this.selectStepSliceElements(this.selectStep, this.steps[this.selectStep])
                        this.setSteps(this.selectStep, this.steps[this.selectStep])
                        console.log('Next ', this.nextOfFinishMode)
                    }
                } else if (this.nextOfFinishMode === 'Finish') {
                    if (this.selectStep === this.steps.length - 1) {
                        this.activeIndex = this.steps.length
                        this.statusComponent = 'Done'
                        this.selectStepSliceElements(this.activeIndex, this.steps[this.activeIndex])
                        this.setClass(this.activeIndex, this.steps[this.activeIndex])
                        console.log('Finish ', this.nextOfFinishMode)
                    }
                }
            } else {
                this.activeIndex = 0
                this.reset()
                this.statusComponent = 'Learning'
            }
        },
        setActive(idx, step, $event = undefined) {
            // когда нажимаем на определенный шаг
            if (!this.isFirstStep) {
                this.activeIndex = idx;
                this.setSteps(idx, step)
            }
        },
        setSteps(idx, step) {
            this.setClass(idx, step)
            this.setContent(idx, step)
        },
        setContent(idx, step) {
            if (step !== undefined) {
                this.titleStep = step.title
                console.log('this.titleStep: ', this.titleStep)
                this.textStep = step.text
                console.log('this.textStep: ', this.textStep)
            }
        },
        setClass(idx, step) {
            if ((this.stepsSelected.length === this.steps.length) && (this.nextOfFinishMode !== 'Finish')) {
                console.log('idx != idx', idx)
                console.log('this.stepsSelected.includes(step) != idx', this.stepsSelected.includes(step))
                return `done`
            } else if (this.selectStep === idx) {
                console.log('idx = idx active', idx)
                console.log('this.stepsSelected.includes(step) == idx active', this.stepsSelected.includes(step))
                if (this.stepsSelected.includes(step)) {
                    return `active`
                }
            } else if (this.steps.length !== idx) {
                if (this.stepsSelected.includes(step)) {
                    return `done`
                }
            }
            return ``
        },
        selectStepSliceElements(idx, step) {
            idx = this.selectStep
            console.log('------- this.stepsSelected.includes(step) до: ', this.stepsSelected.includes(step))
            if (this.stepsSelected.includes(step) && (this.stepsSelected.length === idx)) {
                console.log('(v1) this.stepsSelected.includes(step): ', this.stepsSelected.includes(step))
                console.log('(v1) this.stepsSelected.length === idx+1 ', idx, ' + step: ', step)
                this.setClass(idx, step)
                return this.stepsSelected = this.steps.slice(0, idx + 1)
            } else {
                console.log('(v2) this.stepsSelected.includes(step): ', this.stepsSelected.includes(step))
                console.log('(v2) this.stepsSelected.length === idx ', idx, ' + step: ', step)
                this.setSteps(idx, step)
                return this.stepsSelected = this.steps.slice(0, idx + 1)
            }
        },
        // Для отладки
        selectStepMapStringify(stepsSelected) {
            return this.stepsSelectedStringify = JSON.stringify(stepsSelected, null, '...')
        },
    },
    computed: {
        // тут стоит определить несколько свойств:
        // 1. текущий выбранный шаг
        selectStep: function () {
            return this.activeIndex
        },
        // 2. выключена ли кнопка назад
        isDisabledBtnPrev: function () {
            if (this.stepsSelected.length - 1) {
                return false
            } else {
                return true
            }
        },
        isVisibleBtnPrev: function () {
            if (this.statusComponent === 'Done') {
                return false
            } else {
                return true
            }
        },
        isContentNotEmpty: function () {
            if ((this.titleStep === undefined) && (this.textStep === undefined) && (this.emptyStep !== '')) {
                return false
            } else {
                return true
            }
        },
        isTitleStepNotEmpty: function () {
            if ((this.titleStep === undefined)) {
                return false
            } else {
                return true
            }
        },
        isTextStepNotEmpty: function () {
            if ((this.textStep === undefined)) {
                return false
            } else {
                return true
            }
        },
        // 3. находимся ли мы на последнем шаге
        isStepLast: function () {
            if (this.selectStep === this.steps.length - 1) {
                return true
            } else {
                return false
            }
        },
        // 3.1 находимся ли мы на первом шаге
        isFirstStep: function () {
            if (this.selectStep >= this.steps.length) {
                return true
            } else {
                return false
            }
        },
        // 4. Выбор кнопки Next или Finish или NewLearning
        toggleBtnNextOfFinish: function () {
            if (this.statusComponent === 'Learning') {
                if (this.isStepLast) {
                    this.nextOfFinishMode = 'Finish'
                    return {
                        textBtn: this.btnNextOfFinish.btnFinish.btnText,
                        titleBtn: this.btnNextOfFinish.btnFinish.btnTitle
                    }
                } else {
                    this.nextOfFinishMode = 'Next'
                    return {
                        textBtn: this.btnNextOfFinish.btnDefault.btnText,
                        titleBtn: this.btnNextOfFinish.btnDefault.btnTitle
                    }
                }
            } else {
                this.statusComponent = 'Done'
                return {
                    textBtn: this.btnNewLearning.btnText,
                    titleBtn: this.btnNewLearning.btnTitle
                }
            }
        },
    }
}

Vue.createApp(App).mount('#app')


