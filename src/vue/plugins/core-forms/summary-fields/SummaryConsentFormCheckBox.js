import SummaryBaseField from "./SummaryBaseField"

export default {
  extends: SummaryBaseField,
  computed: {
    isDisplayed() {
      return false
    }
  }
}
