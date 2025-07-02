const products = [
    {
        id: 1,
        name: 'Tシャツ',
        description: 'シンプルで着心地のよいTシャツ。',
        price: 2500,
        category: "Tops",
        image: '/images/tshirt.png'
    },
    {
        id: 2,
        name: 'キャップ',
        description: 'カジュアルに使える定番キャップ。',
        price: 1800,
        category: "Cap",
        image: '/images/cap.png'
    },
    {
        id: 3,
        name: 'ボトムス',
        description: 'スタイリッシュに映えるボトムス。',
        price: 2300,
        category: "Bottoms",
        image: '/images/bottoms.png'
    },
    {
        id: 4,
        name: 'シューズ',
        description: '軽い履き心地のシューズ。',
        price: 3000,
        category: "Shoes",
        image: '/images/shoes.png'
    }
]

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = parseInt(query.page as string || '1', 10)
  const ITEMS_PER_PAGE = 2

  const category = query.category as string | undefined
  const price = query.price as string | undefined

  const start = (page - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  let filtered = products

  if (category) {
    filtered = filtered.filter((p) => p.category === category)
  }

  if (price === 'low') {
    filtered = filtered.filter((p) => p.price <= 3000)
  } else if (price === 'mid') {
    filtered = filtered.filter((p) => p.price > 3000 && p.price <= 10000)
  } else if (price === 'high') {
    filtered = filtered.filter((p) => p.price > 10000)
  }

  const paginatedProducts = filtered.slice(start, end)

  return {
    items: paginatedProducts,
    totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
  }
})
