export const useSideNavMenuStore = defineStore('side-nav-menu', () => {
  const expandedById = ref<Record<string, boolean>>({})

  const isExpanded = (id: string) => expandedById.value[id] !== false

  const setExpanded = (id: string, expanded: boolean) => {
    expandedById.value = {
      ...expandedById.value,
      [id]: expanded,
    }
  }


  const toggleExpanded = (id: string) => {
    setExpanded(id, !isExpanded(id))
  }

  const collapseAll = () => {
    expandedById.value = {}
  }

  return { expandedById, isExpanded, setExpanded, toggleExpanded, collapseAll }
})
