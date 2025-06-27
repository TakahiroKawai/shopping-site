export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const keyword = (query.q as string || '').toLowerCase()

  const response = await $fetch('/api/products')
  const products = Array.isArray(response) ? response : []

  if (!keyword) return products

  return products.filter(product =>
    product.name.toLowerCase().includes(keyword)
  )
})
