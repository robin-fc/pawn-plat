import {
    DIC_ZH,
    DIC_EN
} from "@/model/language.js"
import {
    mapGetters
} from "vuex"
const languageMixin = {
    data() {
        return {
            languagePackage: {}
        }
    },
    mounted() {
        this.languagePackage = (this.language == "zh" ? DIC_ZH : DIC_EN)
    },
    computed: {
        ...mapGetters(["language"])
    },
    watch: {
        language(val) {
            this.languagePackage = val === "zh" ? DIC_ZH : DIC_EN
        }
    }
}
export default languageMixin;