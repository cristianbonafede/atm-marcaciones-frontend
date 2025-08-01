export function buildCrewTree(list, parentId    ) {
    console.log(list.filter(item => item.parentId === parentId));
  return list
    .filter(item => item.parentId === parentId)
    .map(item => ({
      ...item,
      children: buildCrewTree(list, item.id)
    }));
}